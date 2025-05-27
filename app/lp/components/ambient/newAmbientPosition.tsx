import React, { useEffect, useState, useMemo } from "react";
import {
  Hex,
  Address,
  encodeAbiParameters,
  parseAbiParameter,
  formatUnits,
} from "viem";
import { usePublicClient, useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";

import styles from "../dexModals/cantoDex.module.scss";
import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";
import Text from "@/components/text";
import Container from "@/components/container/container";
import Amount from "@/components/amount/amount";
import Spacer from "@/components/layout/spacer";
import { formatPercent } from "@/utils/formatting";
import { ModalItem } from "@/app/lending/components/modal/modal";
import PopUp from "@/components/popup/popup";
import Button from "@/components/button/button";
import Toggle from "@/components/toggle";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import Price from "@/components/price/price";
import SVGLiquidityGraph from "@/components/liquidityGraph/svgGraph";
import Input from "@/components/input/input";
import {
  AmbientAddConcentratedLiquidityParams,
  AmbientTransactionParams,
  AmbientTxType,
} from "@/transactions/pairs/ambient";
import {
  ALL_TICK_KEYS,
  TickRangeKey,
  useNewAmbientPositionManager,
} from "@/utils/ambient/liquidityControllers";
import { Validation } from "@/config/interfaces";
import Analytics from "@/provider/analytics";
import { BigNumber as BN } from "bignumber.js";
import useScreenSize from "@/hooks/helpers/useScreenSize";
import { fetchContractLiquidityCurve } from "@/hooks/pairs/newAmbient/helpers/ifiAmbient";
import { CROCDEX_ABI } from "@/config/abis/crocdex";
import { publicClient } from "@/hooks/pairs/useCrocData";
import { ERC20_ABI } from "@/config/abis";
import { useAddressTokenBalancesQuery } from "@/hooks/swap/useAddressTokenBalances";

/*
Example AmbientPool interface structure assumed by this component:
interface TokenData {
  address: Address;
  symbol: string;
  decimals: number;
  logoURI?: string;
  balance?: string; // User's balance of this token
  isNative?: boolean; // If this is the native chain token (for msg.value)
}
interface PoolStats {
  lastPriceSwap: number; // Price of Base in terms of Quote (e.g., Base/Quote)
  feeRate: number;
}
export interface AmbientPool {
  base: TokenData;
  quote: TokenData;
  symbol: string; // e.g., "BASE-QUOTE"
  poolIdx: number | bigint; // The index of the pool template
  stats: PoolStats;
  tickSize: number; // The tick spacing for this pool
  displayPrecision?: number; // Optional: for formatting prices, defaults to 6 or 4
}
*/

// TODO: Replace with your actual iFi DEX (CrocSwap) contract address
const CROCSWAP_CONTRACT_ADDRESS =
  "0x96eD91FA046387dFfF8B942a8C14F5FBDe4a161A" as Address;

const CrocSlots = {
  BOOT_PROXY_IDX: 0,
  LP_PROXY_IDX: 1, // WarmPath - LIKELY TARGET FOR ADD LIQUIDITY
  COLD_PROXY_IDX: 2, // ColdPath
};

const CALLPATH_FOR_WARM_PATH = CrocSlots.LP_PROXY_IDX; // e.g., 1

const USER_CMD_MINT_RANGE_BASE_LP = 11;
const USER_CMD_MINT_RANGE_QUOTE_LP = 12;

function humanPriceToSqrtPriceQ64_64(
  humanPriceBasePerQuote: string | number | BN
): bigint {
  const priceBQ = new BN(humanPriceBasePerQuote);
  if (priceBQ.isLessThanOrEqualTo(0)) {
    console.error(
      "humanPriceToSqrtPriceQ64_64: Input price (Base/Quote) must be positive:",
      priceBQ.toString()
    );
    throw new Error("Price limit must be positive for sqrtPrice conversion.");
  }
  const priceQB = new BN(1).dividedBy(priceBQ);
  if (priceQB.isLessThanOrEqualTo(0) || !priceQB.isFinite()) {
    console.error(
      `humanPriceToSqrtPriceQ64_64: Cannot convert price ${priceBQ.toString()} to a valid Quote/Base sqrtPrice.`
    );
    throw new Error(
      `Invalid price for sqrtPrice conversion: ${priceBQ.toString()}`
    );
  }

  const sqrtP_QB = priceQB.sqrt();
  const scaleFactor = new BN(2).pow(64); // Scale for Q64.64
  return BigInt(
    sqrtP_QB.multipliedBy(scaleFactor).integerValue(BN.ROUND_FLOOR).toString()
  );
}

function encodeWarmPathAddConcentratedLiquidityCmd(
  params: AmbientAddConcentratedLiquidityParams
): Hex {
  console.log("Encoding for WarmPath with params:", params);

  let commandCode: number;
  if (params.isAmountBase) {
    commandCode = USER_CMD_MINT_RANGE_BASE_LP; // ** REPLACE WITH ACTUAL VALUE **
  } else {
    commandCode = USER_CMD_MINT_RANGE_QUOTE_LP; // ** REPLACE WITH ACTUAL VALUE **
  }
  console.log("Using commandCode (THIS IS A GUESS, VERIFY IT!):", commandCode);

  let contractLimitLowerSqrtPrice_Q64_64: bigint;
  let contractLimitHigherSqrtPrice_Q64_64: bigint;

  try {
    // maxExecPriceWei (max P_B/Q from user) -> min P_Q/B -> lower sqrtPrice limit for contract
    contractLimitLowerSqrtPrice_Q64_64 = humanPriceToSqrtPriceQ64_64(
      params.maxExecPriceWei
    );
    // minExecPriceWei (min P_B/Q from user) -> max P_Q/B -> upper sqrtPrice limit for contract
    contractLimitHigherSqrtPrice_Q64_64 = humanPriceToSqrtPriceQ64_64(
      params.minExecPriceWei
    );
  } catch (e: any) {
    console.error("Error converting price limits to sqrtPrice:", e.message);
    throw new Error(
      `Invalid price limits for sqrtPrice conversion: ${e.message}`
    );
  }

  if (
    contractLimitLowerSqrtPrice_Q64_64 >= contractLimitHigherSqrtPrice_Q64_64
  ) {
    console.error(
      "Calculated sqrtPrice limits are invalid: lower SqrtPrice limit must be less than upper SqrtPrice limit.",
      {
        minUserPriceBQ: params.minExecPriceWei,
        maxUserPriceBQ: params.maxExecPriceWei,
        resultingLowerSqrtQB: contractLimitLowerSqrtPrice_Q64_64.toString(),
        resultingHigherSqrtQB: contractLimitHigherSqrtPrice_Q64_64.toString(),
      }
    );
    throw new Error(
      "Invalid price range: lower sqrtPrice limit is not less than upper sqrtPrice limit after conversion."
    );
  }

  const abiDefinition = [
    { type: "uint8", name: "code" },
    { type: "address", name: "base" },
    { type: "address", name: "quote" },
    { type: "uint256", name: "poolIdx" },
    { type: "int24", name: "bidTick" }, // This is lowerTick from txParams
    { type: "int24", name: "askTick" }, // This is upperTick from txParams
    { type: "uint128", name: "liq" }, // This is txParams.amount (token quantity)
    { type: "uint128", name: "limitLower" }, // This is contractLimitLowerSqrtPrice_Q64_64
    { type: "uint128", name: "limitHigher" }, // This is contractLimitHigherSqrtPrice_Q64_64
    { type: "uint8", name: "reserveFlags" },
    { type: "address", name: "lpConduit" },
  ] as const;

  const values: any = [
    commandCode,
    params.pool.base.address,
    params.pool.quote.address,
    BigInt(params.pool.poolIdx),
    params.lowerTick,
    params.upperTick,
    BigInt(params.amount),
    contractLimitLowerSqrtPrice_Q64_64,
    contractLimitHigherSqrtPrice_Q64_64,
    0, // reserveFlags: Default to 0 (no surplus)
    "0x0000000000000000000000000000000000000000", // lpConduit: Default to address(0)
  ];

  try {
    const cmd = encodeAbiParameters(abiDefinition, values);
    console.log(
      "Encoded WarmPath Add Liq Command:",
      cmd,
      "with values:",
      values
    );
    return cmd;
  } catch (error) {
    console.error("ABI encoding failed:", error, "Values:", values);
    throw new Error("Failed to ABI encode command parameters for WarmPath.");
  }
}

// --- TRANSACTION SENDING FUNCTION ---
/**
 * Checks allowance, requests approval if needed, then sends the
 * "add concentrated liquidity" transaction to the CrocSwap/iFi DEX contract.
 */
async function sendCrocSwapAddLiquidityTx(
  txParams: AmbientAddConcentratedLiquidityParams,
  senderAddress: Address,
  publicClient: any // To check allowance and wait for receipt
): Promise<Hex | null> {
  const tokenToApproveAddress = txParams.isAmountBase
    ? txParams.pool.base.address
    : txParams.pool.quote.address;
  const tokenToApproveSymbol = txParams.isAmountBase
    ? txParams.pool.base.symbol
    : txParams.pool.quote.symbol;
  const tokenToApproveDecimals = txParams.isAmountBase
    ? txParams.pool.base.decimals
    : txParams.pool.quote.decimals;
  const requiredAmount = BigInt(txParams.amount);

  try {
    const currentAllowance = await publicClient.readContract({
      address: tokenToApproveAddress,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [senderAddress, CROCSWAP_CONTRACT_ADDRESS],
    });

    console.log(
      `Current allowance for ${tokenToApproveSymbol}: ${formatUnits(
        currentAllowance,
        tokenToApproveDecimals ?? 18
      )}`
    );
    console.log(
      `Required amount for ${tokenToApproveSymbol}: ${formatUnits(
        requiredAmount,
        tokenToApproveDecimals ?? 18
      )}`
    );

    if (currentAllowance < requiredAmount) {
      console.log("Allowance is insufficient. Requesting approval...");
      alert(
        `This transaction requires you to first approve the DEX to spend your ${tokenToApproveSymbol}.\nPlease confirm the upcoming approval transaction.`
      );

      // Step 2: Send approve transaction
      const approveTx = await writeContract({
        address: tokenToApproveAddress as Address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CROCSWAP_CONTRACT_ADDRESS, requiredAmount], // Approve for the exact amount
        // For max approval (less user prompts later, but more permission):
        // args: [CROCSWAP_CONTRACT_ADDRESS, MaxUint256],
      });
      console.log(
        `Approval transaction sent: ${approveTx.hash}. Waiting for confirmation...`
      );
      alert(
        `Approval transaction sent: ${approveTx.hash}.\nWaiting for it to be confirmed before proceeding with adding liquidity...`
      );

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx.hash,
      });
      if (receipt.status !== "success") {
        console.error("Token approval transaction failed:", receipt);
        alert(
          "Token approval failed. Please check the transaction and try again."
        );
        return null;
      }
      console.log("Token approval successful!");
      alert("Token approval successful. Now preparing to add liquidity...");
    } else {
      console.log("Sufficient token allowance already exists.");
    }
  } catch (approvalError: any) {
    console.error("Error during token approval process:", approvalError);
    alert(
      `Token Approval Error: ${
        approvalError.shortMessage ||
        approvalError.message ||
        "Failed to process token approval."
      }`
    );
    return null;
  }

  const callpath = CALLPATH_FOR_WARM_PATH;
  let cmd: Hex;
  try {
    cmd = encodeWarmPathAddConcentratedLiquidityCmd(txParams);
  } catch (encodeError: any) {
    console.error(
      "CRITICAL: Failed to encode add liquidity command:",
      encodeError.message || encodeError
    );
    alert(
      `Encoding Error: ${
        encodeError.message || "Could not prepare transaction data."
      }`
    );
    return null;
  }

  // Determine msg.value if native token is involved
  let nativeTokenValue = 0n;
  if (txParams.isAmountBase && txParams.pool.base.isNative) {
    nativeTokenValue = BigInt(txParams.amount);
  } else if (!txParams.isAmountBase && txParams.pool.quote.isNative) {
    nativeTokenValue = BigInt(txParams.amount);
  }

  try {
    // Step 4: Simulate the userCmd transaction
    console.log(
      `Simulating userCmd on ${CROCSWAP_CONTRACT_ADDRESS} with callpath: ${callpath}, cmd: ${cmd}, account: ${senderAddress}`
    );

    const { request } = await publicClient.simulateContract({
      // publicClient can also simulate
      address: CROCSWAP_CONTRACT_ADDRESS,
      abi: CROCDEX_ABI,
      functionName: "userCmd",
      args: [callpath, cmd],
      account: senderAddress, // Crucial for accurate simulation
      value: nativeTokenValue > 0n ? nativeTokenValue : undefined,
    });
    console.log("Transaction simulation successful. Proceeding to send.");

    // Step 5: If simulation is successful, send the actual transaction
    const hash = await writeContract(request); // Pass the request from simulation

    console.log("Add Liquidity transaction sent successfully, hash:", hash);
    alert(`Add Liquidity Transaction Submitted!\nHash: ${hash}`);
    return hash;
  } catch (error: any) {
    // This catches errors from simulateContract or writeContract
    console.error(
      "Error during simulation or sending Add Liquidity transaction:",
      error
    );
    let specificMessage = "Unknown error during transaction execution.";
    if (error.cause) {
      let cause = error.cause;
      while (cause.cause) {
        cause = cause.cause;
      }
      specificMessage = cause.shortMessage || cause.message || String(cause);
    } else {
      specificMessage = error.shortMessage || error.message || String(error);
    }
    alert(`Transaction Failed: ${specificMessage}`);
    return null;
  }
}

// --- React Component ---

interface NewPositionModalProps {
  pool: AmbientPool;
  verifyParams: (params: Partial<AmbientTransactionParams>) => Validation;
}

const formatPriceForDisplayLocal = (
  price: number | string,
  precision: number = 6
): string => {
  const num = Number(price);
  if (isNaN(num) || !isFinite(num)) return "N/A";
  if (num === 0) return (0).toFixed(Math.min(2, precision));
  return num.toFixed(precision);
};

export const NewAmbientPositionModal = ({
  pool,
  verifyParams,
}: NewPositionModalProps) => {
  console.log("pool", pool);
  const {
    base: baseToken,
    quote: quoteToken,
    symbol: poolSymbol,
    stats,
    tickSize,
    poolIdx,
    displayPrecision = 6,
  } = pool;
  const positionManager = useNewAmbientPositionManager(pool);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TickRangeKey>("DEFAULT");
  const publicClient = usePublicClient();
  const [graphPoints, setGraphPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const { isMobile } = useScreenSize();
  const { address: userAddress } = useAccount();

  const currentMarketPrice = useMemo(() => {
    return stats &&
      typeof stats.lastPriceSwap === "number" &&
      isFinite(stats.lastPriceSwap)
      ? Number(stats.lastPriceSwap)
      : 0;
  }, [stats]);

  const { data: tokenBalances } = useAddressTokenBalancesQuery(userAddress);

  const baseBalanceObj = (tokenBalances ?? []).find(
    (b) => b.token.address.toLowerCase() === pool.base.address.toLowerCase()
  );
  const quoteBalanceObj = (tokenBalances ?? []).find(
    (b) => b.token.address.toLowerCase() === pool.quote.address.toLowerCase()
  );

  const baseTokenWithBalance = {
    ...pool.base,
    balance: baseBalanceObj ? baseBalanceObj.value.toString() : "0",
  };
  const quoteTokenWithBalance = {
    ...pool.quote,
    balance: quoteBalanceObj ? quoteBalanceObj.value.toString() : "0",
  };

  useEffect(() => {
    async function getGraphData() {
      if (
        !publicClient ||
        !baseToken ||
        !quoteToken ||
        !stats ||
        currentMarketPrice === 0 ||
        typeof tickSize !== "number" ||
        (typeof poolIdx !== "number" && typeof poolIdx !== "bigint")
      ) {
        console.warn(
          "getGraphData: Pre-conditions not met (client, tokens, stats, valid currentMarketPrice, tickSize, or poolIdx)."
        );
        setGraphPoints([]);
        return;
      }
      try {
        const points = await fetchContractLiquidityCurve(publicClient, {
          base: baseToken,
          quote: quoteToken,
          poolIdx: Number(poolIdx),
          stats: { lastPriceSwap: currentMarketPrice },
          tickSize: tickSize,
        });
        console.log("Fetched graphPoints for modal:", points);
        setGraphPoints(points);
      } catch (error) {
        console.error(
          "Error fetching contract liquidity curve for modal:",
          error
        );
        setGraphPoints([]);
      }
    }
    if (showAdvanced) {
      getGraphData();
    } else {
      setGraphPoints([]);
    }
  }, [
    publicClient,
    baseToken,
    quoteToken,
    poolIdx,
    stats,
    currentMarketPrice,
    tickSize,
    showAdvanced,
  ]);

  function setDefaultParams(tickKey: TickRangeKey) {
    setSelectedOption(tickKey);
    positionManager.setters.setDefaultParams(tickKey);
  }

  function setPriceRange(price: { min?: string; max?: string }) {
    positionManager.setters.setRangePrice({
      min: Number(price.min) < 0 ? "0" : price.min,
      max: Number(price.max) < 0 ? "0" : price.max,
    });
    setSelectedOption("CUSTOM");
  }

  const percentDiff = (marketPrice: number, rangePrice: number) => {
    if (marketPrice === 0 || !isFinite(marketPrice) || !isFinite(rangePrice))
      return "N/A";
    return formatPercent(((rangePrice - marketPrice) / marketPrice).toString());
  };

  function getWeiRangePrice(priceFormatted: string): string {
    if (
      !baseToken ||
      !quoteToken ||
      typeof baseToken.decimals !== "number" ||
      typeof quoteToken.decimals !== "number"
    ) {
      console.warn("getWeiRangePrice: Missing token decimal information.");
      return "0";
    }
    const scale = BN(10).pow(baseToken.decimals - quoteToken.decimals);
    const priceWei = scale.multipliedBy(priceFormatted).toString();
    return priceWei;
  }

  const graphXAxis = useMemo(() => {
    let minX: number, maxX: number;
    if (graphPoints.length > 1) {
      const xValues = graphPoints.map((p) => p.x).filter((x) => isFinite(x));
      if (xValues.length > 0) {
        minX = Math.min(...xValues);
        maxX = Math.max(...xValues);
        const spread = maxX - minX;
        const padding =
          spread === 0
            ? minX === 0
              ? 0.01
              : Math.abs(minX * 0.01)
            : spread * 0.1;
        minX = Math.max(0, minX - padding);
        maxX = maxX + padding;
      } else {
        minX = currentMarketPrice > 0 ? currentMarketPrice * 0.95 : 0.95;
        maxX = currentMarketPrice > 0 ? currentMarketPrice * 1.05 : 1.05;
      }
    } else if (currentMarketPrice > 0) {
      minX = currentMarketPrice * 0.988;
      maxX = currentMarketPrice * 1.02;
    } else {
      minX = 0.95;
      maxX = 1.05;
    }
    if (minX === maxX) {
      minX = minX > 0 ? minX * 0.99 : minX === 0 ? 0 : -0.01;
      maxX = maxX > 0 ? maxX * 1.01 : maxX === 0 ? 1 : 0.01;
      if (minX === 0 && maxX === 0) {
        maxX = 1;
      }
    }
    return { min: minX, max: maxX };
  }, [graphPoints, currentMarketPrice]);

  const graphYAxis = useMemo(() => {
    let maxY = 0.00001;
    if (graphPoints.length > 0) {
      const yValues = graphPoints.map((p) => p.y).filter((y) => isFinite(y));
      if (yValues.length > 0) {
        const dataMaxY = Math.max(...yValues);
        maxY = dataMaxY > 0 ? dataMaxY * 1.1 : maxY;
      }
    }
    return { min: -maxY * 0.05, max: maxY };
  }, [graphPoints]);

  const handleAddLiquidityClick = async () => {
    if (!userAddress) {
      alert("Please connect your wallet.");
      return;
    }
    const coreLiquidityParams = positionManager.txParams.addLiquidity();

    const paramsForValidation: Partial<AmbientTransactionParams> = {
      ...coreLiquidityParams,
      txType: AmbientTxType.ADD_CONC_LIQUIDITY,
    };

    // const validation = verifyParams(paramsForValidation);
    // if (validation.error) {
    //   console.warn(
    //     "Add Liquidity pre-flight validation failed:",
    //     validation.reason
    //   );
    //   alert(`Validation Error: ${validation.reason}`);
    //   return;
    // }

    const txHash = await sendCrocSwapAddLiquidityTx(
      coreLiquidityParams,
      userAddress,
      publicClient
    );

    if (txHash) {
      // TODO: Add post-submission UI updates (e.g., close modal, show success toast, refresh user positions)
    } else {
      console.error("Modal: Add Liquidity transaction submission failed.");
    }
  };

  const currentTxForValidation: Partial<AmbientTransactionParams> =
    useMemo(() => {
      return {
        ...positionManager.txParams.addLiquidity(),
        txType: AmbientTxType.ADD_CONC_LIQUIDITY,
      };
    }, [positionManager]);

  return (
    <Container
      width={
        !isMobile ? (showAdvanced ? "64rem" : "32rem") : "calc(100vw - 3rem)"
      }
    >
      <Container
        direction="row"
        gap={20}
        className={styles.ambientBaseContainer}
      >
        <Container>
          <Container
            direction="row"
            gap="auto"
            center={{ horizontal: true, vertical: true }}
            width="100%"
          >
            <div />
            <Container
              direction="row"
              center={{ horizontal: true, vertical: true }}
              gap={10}
            >
              <Text theme="secondary-dark" size="x-sm">
                Advanced
              </Text>
              <Toggle
                value={showAdvanced}
                onChange={(advanced) => {
                  if (
                    advanced &&
                    poolSymbol &&
                    baseToken?.symbol &&
                    quoteToken?.symbol
                  ) {
                    Analytics.actions.events.liquidityPool.ambientDexLpModal.advanceClicked(
                      {
                        ambientLp: poolSymbol,
                        baseToken: baseToken.symbol,
                        quoteToken: quoteToken.symbol,
                      }
                    );
                  }
                  setDefaultParams("DEFAULT");
                  setShowAdvanced(advanced);
                }}
              />
            </Container>
          </Container>
          <Spacer height="10px" />
          <div className={styles.iconTitle}>
            <Text size="lg" font="proto_mono">
              {poolSymbol ?? "Pool"}
            </Text>
          </div>
          <Spacer height="10px" />
          <Amount
            decimals={baseTokenWithBalance.decimals}
            value={positionManager.options.amountBase}
            onChange={(e) =>
              positionManager.setters.setAmount(e.target.value, true)
            }
            IconUrl={baseTokenWithBalance.logoURI}
            title={baseTokenWithBalance.symbol ?? "Base"}
            min="0"
            max={baseTokenWithBalance.balance}
            maxName="LP Modal"
            symbol={baseTokenWithBalance.symbol ?? "BASE"}
            ambientAmountError={
              currentMarketPrice > 0 &&
              currentMarketPrice <=
                Number(positionManager.options.minRangePrice) &&
              Number(positionManager.options.amountBase) !== 0
            }
          />
          <Spacer height="12px" />
          <Amount
            decimals={quoteTokenWithBalance.decimals}
            value={positionManager.options.amountQuote}
            onChange={(e) =>
              positionManager.setters.setAmount(e.target.value, false)
            }
            IconUrl={quoteTokenWithBalance.logoURI}
            title={quoteTokenWithBalance.symbol ?? "Quote"}
            min="0"
            max={quoteTokenWithBalance.balance}
            maxName="LP Modal"
            symbol={quoteTokenWithBalance.symbol ?? "QUOTE"}
            ambientAmountError={
              currentMarketPrice > 0 &&
              currentMarketPrice >=
                Number(positionManager.options.maxRangePrice) &&
              Number(positionManager.options.amountQuote) !== 0
            }
          />
          <Spacer height="20px" />
          <Container className={styles.card}>
            <ModalItem
              name="Current Price"
              value={
                stats &&
                typeof stats.lastPriceSwap === "number" &&
                baseToken.symbol &&
                quoteToken.symbol
                  ? `${formatPriceForDisplayLocal(
                      stats.lastPriceSwap,
                      displayPrecision
                    )} ${baseToken.symbol} / ${quoteToken.symbol}`
                  : "N/A"
              }
            />
            <ModalItem
              name="Fee"
              value={
                <Container>
                  <PopUp
                    content={
                      <Text>Liquidity providers will receive fee on swaps</Text>
                    }
                    width="300px"
                  >
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "6px",
                      }}
                    >
                      <span className={styles.infoPop}>
                        <Text
                          theme="secondary-dark"
                          size="sm"
                          style={{ textAlign: "right" }}
                        >
                          ?
                        </Text>
                      </span>
                      <Text>
                        {stats && typeof stats.feeRate === "number"
                          ? formatPercent(stats.feeRate.toString())
                          : "N/A"}
                      </Text>
                    </Container>
                  </PopUp>
                </Container>
              }
            />
            <ModalItem
              name="Min Execution Price: "
              value={
                <Container
                  center={{ vertical: true }}
                  gap={10}
                  direction="row"
                  style={{ width: "100px" }}
                >
                  <Input
                    height="sm"
                    type="number"
                    value={positionManager.options.minExecutionPrice}
                    onChange={(e) =>
                      positionManager.setters.setExecutionPrice(
                        e.target.value,
                        true
                      )
                    }
                  />
                </Container>
              }
            />
            <ModalItem
              name="Max Execution Price: "
              value={
                <Container
                  center={{ vertical: true }}
                  gap={10}
                  direction="row"
                  style={{ width: "100px" }}
                >
                  <Input
                    height="sm"
                    type="number"
                    value={positionManager.options.maxExecutionPrice}
                    onChange={(e) =>
                      positionManager.setters.setExecutionPrice(
                        e.target.value,
                        false
                      )
                    }
                  />
                </Container>
              }
            />
          </Container>
          <Spacer height="8px" />
          <Text size="x-sm" theme="secondary-dark">
            This is a concentrated liquidity stable pool. The default range is
            selected for optimal rewards. Rewards will be released in weekly
            epochs.
          </Text>
          <Spacer height="8px" />
          {!showAdvanced && (
            <Container className={styles.card}>
              <ModalItem
                name="Min Range Price: "
                value={formatPriceForDisplayLocal(
                  positionManager.options.minRangePrice,
                  displayPrecision
                )}
              />
              <ModalItem
                name="Max Range Price: "
                value={formatPriceForDisplayLocal(
                  positionManager.options.maxRangePrice,
                  displayPrecision
                )}
              />
            </Container>
          )}
        </Container>

        {showAdvanced && (
          <Container className={styles.advancedContainer}>
            <Container gap={10}>
              <SVGLiquidityGraph
                title="Set Price Range"
                points={graphPoints}
                options={{
                  axis: { x: graphXAxis, y: graphYAxis },
                  boundaries: { x: { min: 0, max: Infinity } },
                }}
                parentOptions={{
                  currentXValue: currentMarketPrice,
                  minXValue: Number(positionManager.options.minRangePrice),
                  maxXValue: Number(positionManager.options.maxRangePrice),
                  setValues: (prices) =>
                    setPriceRange({
                      min: prices.min?.toFixed(displayPrecision),
                      max: prices.max?.toFixed(displayPrecision),
                    }),
                }}
              />
            </Container>
            <Spacer height="30px" />
            <ToggleGroup
              options={ALL_TICK_KEYS}
              selected={selectedOption}
              setSelected={(tickKey) =>
                setDefaultParams(tickKey as TickRangeKey)
              }
            />
            <Spacer height="16px" />
            <Container direction="row">
              <Price
                title="Min Range Price"
                price={positionManager.options.minRangePrice}
                onPriceChange={(price) => setPriceRange({ min: price })}
                description={percentDiff(
                  currentMarketPrice,
                  Number(positionManager.options.minRangePrice ?? "0")
                )}
              />
              <Spacer width="32px" />
              <Price
                title="Max Range Price"
                price={positionManager.options.maxRangePrice}
                onPriceChange={(price) => setPriceRange({ max: price })}
                description={percentDiff(
                  currentMarketPrice,
                  Number(positionManager.options.maxRangePrice ?? "0")
                )}
              />
            </Container>
          </Container>
        )}
      </Container>
      <Spacer height="15px" />
      <Button
        // disabled={verifyParams(currentTxForValidation).error}
        width="fill"
        onClick={handleAddLiquidityClick}
      >
        Add LP
      </Button>
      <Spacer height="30px" />
    </Container>
  );
};
