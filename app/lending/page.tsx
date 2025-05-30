"use client";

import styles from "./lending.module.scss";
import Modal from "@/components/modal/modal";
import LiquidateModal from "@/components/liquidate_modal/modal";
import Table from "@/components/table/table";
import { displayAmount, formatPercent } from "@/utils/formatting";
import { useLendingCombo } from "./utils";
import Text from "@/components/text";
import Container from "@/components/container/container";
import { LendingModal } from "./components/modal/modal";
import { useState, useMemo, useEffect } from "react";
import Spacer from "@/components/layout/spacer";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import AccountHealth from "./components/accountHealth/accountHealth";
import TokenCard from "./components/tokenCard/tokenCard";
import Icon from "@/components/icon/icon";
import {
  addTokenBalances,
  divideBalances,
  greaterThan,
} from "@/utils/math/tokenMath.utils";
import useScreenSize from "@/hooks/helpers/useScreenSize";
import clsx from "clsx";
import { CTokenWithUserData } from "@/hooks/lending/interfaces/tokens";
import Splash from "@/components/splash/splash";
import { Pagination } from "@/components/pagination/Pagination";
import { useAccount } from "wagmi";
import { HealthBar } from "./components/healthBar/healthBar";
import { useBorrowBalances } from "@/hooks/lending/useBorrowBalances";
import {
  writeContract,
  waitForTransaction,
  readContract,
  readContracts,
} from "@wagmi/core";
import { CERC20_ABI } from "@/config/abis/clm/cErc20";
import { parseUnits } from "viem";
import { useToast } from "@/components/toast/useToast";
import {
  useMyPositionsCountQuery,
  useMyPositionsQuery,
  usePositionsCountQuery,
  usePositionsQuery,
  OrderDirection,
  useMarketsQuery,
} from "@/hooks/generated/clm-graphql.hook";
import { ApolloContext } from "@/enums/apollo-context.enum";
import { CLM_TOKENS } from "@/config/consts/addresses";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { COMPTROLLER_ABI } from "@/config/abis";
import { CANTO_MAINNET_EVM } from "@/config/networks";
import { apolloClient } from "@/config/apollo.config";
import { GET_TOKEN_PRICES } from "@/graphql";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import InputLiquidate from "@/components/inputLiquidate/input";

enum CLMModalTypes {
  SUPPLY = "supply",
  BORROW = "borrow",
  NONE = "none",
}

interface AccountLiquidityData {
  errorCode: string;
  liquidity: string;
  shortfall: string;
}

interface CallMapping {
  positionId: string;
  tokenName: string;
  decimals: number;
}

const extraCTokensSupply = [
  {
    name: "CUSYC",
    id: "0x0355e393cf0cf5486d9caefb64407b7b1033c2f1",
    decimals: 6,
    collateralFactor: 1.0,
  },
  {
    name: "CFBILL",
    id: "0xf1f89df149bc5f2b6b29783915d1f9fe2d24459c",
    decimals: 18,
    collateralFactor: 1.0,
  },
  {
    name: "CIFBILL",
    id: "0x897709fc83ba7a4271d22ed4c01278cc1da8d6f8",
    decimals: 18,
    collateralFactor: 1.0,
  },
  {
    name: "CUSDC",
    id: "0xde59f060d7ee2b612e7360e6c1b97c4d8289ca2e",
    decimals: 6,
    collateralFactor: 1.0,
  },
  {
    name: "CUSDT",
    id: "0x6b46ba92d7e94ffa658698764f5b8dfd537315a9",
    decimals: 6,
    collateralFactor: 1.0,
  },
];

const addressesToExclude = [
  {
    id: "0x3c96dcfd875253a37acb3d2b102b6f328349b16b",
  },
  {
    id: "0xb49a395b39a0b410675406bee7bd06330cb503e3",
  },
  {
    id: "0xc0d6574b2fe71eed8cd305df0da2323237322557",
  },
  {
    id: "0xd6a97e43fc885a83e97d599796458a331e580800",
  },
  {
    id: "0xf0cd6b5ce8a01d1b81f1d8b76643866c5816b49f",
  },
];

function sortCTokens(
  a: CTokenWithUserData,
  b: CTokenWithUserData,
  sortBy: "supplyBalanceInUnderlying" | "borrowBalance"
) {
  // sort by prop first
  if (a.userDetails?.[sortBy] !== "0" || b.userDetails?.[sortBy] !== "0") {
    return greaterThan(
      a.userDetails?.[sortBy] ?? "0",
      b.userDetails?.[sortBy] ?? "0",
      a.decimals,
      b.decimals
    )
      ? -1
      : 1;
  }
  // if no balance, sort by symbol
  return a.underlying.symbol.localeCompare(b.underlying.symbol);
}

async function getAccountLiquidity(
  accountAddress: `0x${string}`
): Promise<AccountLiquidityData> {
  try {
    const [errorCode, liquidity, shortfall] = await readContract({
      address: "0x5E23dC409Fc2F832f83CEc191E245A191a4bCc5C",
      abi: COMPTROLLER_ABI,
      functionName: "getAccountLiquidity",
      args: [accountAddress],
      chainId: CANTO_MAINNET_EVM.chainId,
    });

    return {
      errorCode: errorCode.toString(),
      liquidity: liquidity.toString(),
      shortfall: shortfall.toString(),
    };
  } catch (error) {
    console.error(
      `Error fetching liquidity for account ${accountAddress}:`,
      error
    );
    return {
      errorCode: "1",
      liquidity: "0",
      shortfall: "0",
    };
  }
}

function numericHF(supplied?: number, borrowed?: number): number {
  if (supplied === undefined || borrowed === undefined) return -Infinity;
  if (borrowed === 0) return Infinity;
  const hf = supplied / borrowed;
  return hf > 2 ? 2 : hf;
}

const POSITIONS_PER_PAGE = 10;

function deriveHealthFactor(
  totalSuppliedValue: number | undefined,
  borrowBalanceValue: number | undefined
) {
  if (totalSuppliedValue === undefined || borrowBalanceValue === undefined) {
    return "Loading...";
  }

  if (borrowBalanceValue === 0) {
    return "N/A";
  }

  const hf = totalSuppliedValue / borrowBalanceValue;

  if (hf > 2) {
    return "2.00";
  }

  return hf.toFixed(2);
}

export default function LendingPage() {
  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const [loadingPositions, setLoadingPositions] = useState<
    Record<string, boolean>
  >({});

  const handleLiquidate = async (position: any, selected: any) => {
    if (!address) {
      toast.add({
        primary: "Please connect your wallet to liquidate positions",
        state: "failure",
        duration: 4000,
      });
      return;
    }

    try {
      setLoadingPositions((prev) => ({ ...prev, [selected.market.id]: true }));

      const tokenDecimals =
        CLM_TOKENS.find(
          (token) => token.id.toLowerCase() === position.market.id.toLowerCase()
        )?.decimals ?? 18;

      const repayStr = repayAmounts[selected.market.id] || "0";
      const repayAmountBigInt = parseUnits(repayStr, tokenDecimals);

      const borrowedToken = position.account.tokens.find(
        (token: any) =>
          parseFloat(token.totalUnderlyingBorrowed) > 0 &&
          token.market.id.toLowerCase() === position.market.id.toLowerCase()
      );

      const allowance = await readContract({
        address: borrowedToken.market.underlyingAddress,
        abi: CERC20_ABI,
        functionName: "allowance",
        args: [address as `0x${string}`, position.market.id.toLowerCase()],
      });

      const balance = await readContract({
        address: borrowedToken.market.underlyingAddress,
        abi: CERC20_ABI,
        functionName: "balanceOf",
        chainId: CANTO_MAINNET_EVM.chainId,
        args: [address as `0x${string}`],
      });

      if (allowance < repayAmountBigInt) {
        const { hash: approvalHash } = await writeContract({
          address: borrowedToken.market.underlyingAddress,
          abi: CERC20_ABI,
          functionName: "approve",
          args: [position.market.id.toLowerCase(), repayAmountBigInt],
        });

        const { status: approvalStatus } = await waitForTransaction({
          hash: approvalHash,
        });

        if (!approvalStatus) {
          throw new Error("Approval failed");
        }
      }

      if (!selected.market.id) {
        throw new Error("Insufficient Collateral To Seize");
      }

      if (balance < repayAmountBigInt) {
        throw new Error("Insufficient Balance To Repay The Amount");
      }

      // Pre-check using liquidateCalculateSeizeTokens
      const comptrollerAddress = "0x5E23dC409Fc2F832f83CEc191E245A191a4bCc5C"; // Replace with your Comptroller's address
      const [errorCode, seizeTokens] = await readContract({
        address: comptrollerAddress,
        abi: COMPTROLLER_ABI,
        functionName: "liquidateCalculateSeizeTokens",
        args: [
          position.market.id.toLowerCase(), // cTokenBorrowed
          selected.market.id.toLowerCase(), // cTokenCollateral
          repayAmountBigInt,
        ],
      });

      // If errorCode != 0, something is off with calculation
      if (errorCode !== BigInt(0)) {
        setLoadingPositions((prev) => ({
          ...prev,
          [selected.market.id]: false,
        }));
        throw new Error(
          "Liquidation seize calculation failed. Please try a smaller amount."
        );
      }

      const cTokenAddress = selected.market.id.toLowerCase() as `0x${string}`;
      const borrowerAddress =
        position.account.id.toLowerCase() as `0x${string}`;

      // 1. Read the borrower's cToken balance
      const cTokenBalance = await readContract({
        address: cTokenAddress,
        abi: CERC20_ABI, // This should be the cToken ABI (like cErc20)
        functionName: "balanceOf",
        args: [borrowerAddress],
      });

      // 2. Get the exchange rate to convert cToken to underlying
      // const exchangeRate = await readContract({
      //   address: cTokenAddress,
      //   abi: CERC20_ABI,
      //   functionName: "exchangeRateStored",
      // });

      // 3. Convert the cToken balance to underlying (both cTokenBalance and exchangeRate are BigInts)
      const underlyingBalance = cTokenBalance;

      // Now compare seizeTokens to the borrower's underlyingBalance
      if (seizeTokens > underlyingBalance) {
        setLoadingPositions((prev) => ({
          ...prev,
          [selected.market.id]: false,
        }));
        throw new Error(
          "Seizing collateral exceeds borrower's holdings. Try repaying less."
        );
      }

      // If we reach here, safe to proceed with liquidation
      const { hash } = await writeContract({
        address: position.market.id.toLowerCase() as `0x${string}`,
        abi: CERC20_ABI,
        functionName: "liquidateBorrow",
        args: [
          position.account.id.toLowerCase(),
          repayAmountBigInt,
          selected.market.id,
        ],
      });

      const { status } = await waitForTransaction({ hash });

      if (status) {
        setLoadingPositions((prev) => ({
          ...prev,
          [selected.market.id]: false,
        }));

        toast.add({
          primary: "Position liquidated successfully",
          state: "success",
          duration: 4000,
        });
        refetchAllPositions();
        refetchMyPositions();
        setRepayAmounts({});
        setOpenLiquidateModal(false);
      } else {
        setLoadingPositions((prev) => ({
          ...prev,
          [selected.market.id]: false,
        }));
        toast.add({
          primary: "Liquidation transaction reverted",
          state: "failure",
          duration: 4000,
        });
      }
    } catch (error: any) {
      setLoadingPositions((prev) => ({ ...prev, [selected.market.id]: false }));
      console.error("Liquidation failed:", error.message);
      toast.add({
        primary: error.message,
        state: "failure",
        duration: 4000,
      });
    }
  };

  // track current modal type
  const [currentModal, setCurrentModal] = useState<CLMModalTypes>(
    CLMModalTypes.NONE
  );

  const [currentToggle, setCurrentToggle] = useState<"Supply" | "Borrow">(
    "Supply"
  );

  const [openLiquidateModal, setOpenLiquidateModal] = useState(false);
  const [selectedBorrowerPosition, setSelectedBorrowerPosition] =
    useState<any>(null);

  const [currentPositionsPage, setCurrentPositionsPage] = useState(1);

  const handlePositionsPageClick = (pageNumber: number) => {
    setCurrentPositionsPage(pageNumber);
  };

  // get all data from lending combo
  const {
    cTokens,
    clmPosition,
    transaction,
    selection,
    isLoading,
    lendingStats,
  } = useLendingCombo({
    onSuccessTx: () => {
      setCurrentModal(CLMModalTypes.NONE);
    },
  });
  const { cNote, rwas, stableCoins } = cTokens;
  const { selectedCToken, setSelectedCToken } = selection;
  const { isMobile } = useScreenSize();

  const [positionsToggle, setPositionsToggle] = useState<"All" | "My">("All");
  const { address } = useAccount();

  const [sortDirection, setSortDirection] = useState<OrderDirection>(
    OrderDirection.DESC
  );

  const [positionsTotalSupplied, setPositionsTotalSupplied] = useState<
    Record<string, number>
  >({});

  const {
    data: allPositionsData,
    loading: allPositionsLoading,
    refetch: refetchAllPositions,
  } = usePositionsQuery({
    variables: {
      skip: 0,
      first: 100,
      orderDirection: OrderDirection.DESC,
    },
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });

  const {
    data: myPositionsData,
    loading: myPositionsLoading,
    refetch: refetchMyPositions,
  } = useMyPositionsQuery({
    variables: {
      account: address ?? "",
      skip: (currentPositionsPage - 1) * POSITIONS_PER_PAGE,
      first: POSITIONS_PER_PAGE,
      orderDirection: sortDirection,
    },
    skip: !address || positionsToggle === "All",
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });

  const { data: allPositionsCount } = usePositionsCountQuery({
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });
  const { data: myPositionsCount } = useMyPositionsCountQuery({
    variables: { account: address ?? "" },
    skip: !address || positionsToggle === "All",
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });

  const positions = useMemo(
    () =>
      positionsToggle === "All"
        ? allPositionsData?.accountCTokens ?? []
        : myPositionsData?.accountCTokens ?? [],
    [positionsToggle, allPositionsData, myPositionsData]
  );

  const borrowBalances = useBorrowBalances(positions);

  const sortedPositionsByHF = useMemo(() => {
    return [...positions].sort((a, b) => {
      const hfA = numericHF(
        positionsTotalSupplied[a.id],
        Number(borrowBalances[a.id]?.borrowBalance)
      );
      const hfB = numericHF(
        positionsTotalSupplied[b.id],
        Number(borrowBalances[b.id]?.borrowBalance)
      );
      return hfA - hfB;
    });
  }, [positions, positionsTotalSupplied, borrowBalances]);

  const paginatedPositions = useMemo(() => {
    const start = (currentPositionsPage - 1) * POSITIONS_PER_PAGE;
    return sortedPositionsByHF.slice(start, start + POSITIONS_PER_PAGE);
  }, [sortedPositionsByHF, currentPositionsPage]);

  const totalPages = Math.ceil(sortedPositionsByHF.length / POSITIONS_PER_PAGE);

  const [extraBalances, setExtraBalances] = useState<Record<string, string>>(
    {}
  );

  const [repayAmounts, setRepayAmounts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!positions.length) return;

    (async () => {
      const results: Record<string, number> = {};
      const contractReads: any[] = [];
      const mappings: CallMapping[] = [];

      positions.forEach((pos) => {
        // skip excluded …
        let supplied = 0;
        pos.account.tokens.forEach((t) => {
          if (
            +t.market.collateralFactor > 0.5 &&
            +t.totalUnderlyingSupplied > +t.totalUnderlyingBorrowed
          ) {
            supplied += +t.totalUnderlyingSupplied;
          }
        });
        results[pos.id] = supplied;

        extraCTokensSupply.forEach((tok) => {
          contractReads.push({
            address: tok.id as `0x${string}`,
            abi: CERC20_ABI,
            functionName: "balanceOf",
            args: [pos.account.id as `0x${string}`],
            chainId: CANTO_MAINNET_EVM.chainId,
          });
          mappings.push({
            positionId: pos.id,
            tokenName: tok.name,
            decimals: tok.decimals,
          });
        });
      });

      const balances = await readContracts({
        contracts: contractReads,
        allowFailure: false,
      });
      balances.forEach((bal, i) => {
        const { positionId, tokenName, decimals } = mappings[i];
        let val = Number(bal) / 10 ** decimals;
        if (tokenName === "CUSYC") val *= 1.06;
        results[positionId] += val;
      });

      setPositionsTotalSupplied(results);
    })();
  }, [positions]);

  useEffect(() => {
    if (!selectedBorrowerPosition) return;

    const userAddress =
      selectedBorrowerPosition.account.id.toLowerCase() as `0x${string}`;

    const fetchExtraBalances = async () => {
      const updates: Record<string, string> = {};

      await Promise.all(
        extraCTokensSupply.map(async (token) => {
          const balance = (await readContract({
            address: token.id as `0x${string}`,
            abi: CERC20_ABI,
            functionName: "balanceOf",
            chainId: CANTO_MAINNET_EVM.chainId,
            args: [userAddress],
          })) as bigint;

          if (balance > 0n) {
            updates[token.id] = String(
              parseFloat(balance.toString()) / 10 ** token.decimals
            );
          }
        })
      );

      setExtraBalances(updates);
    };

    fetchExtraBalances();
  }, [selectedBorrowerPosition, openLiquidateModal]);

  const [accountLiquidities, setAccountLiquidities] = useState<
    Record<string, AccountLiquidityData>
  >({});

  useEffect(() => {
    const fetchAccountLiquidities = async () => {
      const newAccountLiquidities: any = {};

      await Promise.all(
        paginatedPositions.map(async (position) => {
          const accountId = position.account.id.toLowerCase();
          const liquidityData = await getAccountLiquidity(
            accountId as `0x${string}`
          );

          newAccountLiquidities[position.id] = liquidityData;
        })
      );

      setAccountLiquidities(newAccountLiquidities);
    };

    if (paginatedPositions.length > 0) {
      fetchAccountLiquidities();
    }
  }, [paginatedPositions]);

  const { data: marketsData } = useMarketsQuery({
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });

  const [totalStats, setTotalStats] = useState({
    totalBorrowed: 0,
    totalSupplied: 0,
    totalNoteBorrowed: 0,
    totalNoteSupplied: 0,
    totalLiquidNote: 0,
  });

  useEffect(() => {
    const calculateTotals = async () => {
      if (!marketsData?.markets) return;

      let totalBorrowed = 0;
      let totalSupplied = 0;
      let totalNoteBorrowed = 0;
      let totalNoteSupplied = 0;
      let totalLiquidNote = 0;

      // Pre-fetch prices from the DEX subgraph
      const pricePromises = marketsData.markets.map((market) =>
        apolloClient.query({
          query: GET_TOKEN_PRICES,
          variables: {
            tokenId: market.underlyingAddress.toLowerCase(),
          },
          context: {
            endpoint: ApolloContext.DEX,
          },
        })
      );

      const prices = await Promise.all(pricePromises);

      // Addresses we need to fetch real-time prices for:
      const USYC_ADDRESS =
        "0x0355e393cf0cf5486d9caefb64407b7b1033c2f1".toLowerCase();
      const IFBILL_ADDRESS =
        "0x897709fc83ba7a4271d22ed4c01278cc1da8d6f8".toLowerCase();
      const FBILL_ADDRESS =
        "0xf1f89df149bc5f2b6b29783915d1f9fe2d24459c".toLowerCase();
      const RWA_ADDRESS =
        "0xb65ec550ff356eca6150f733ba9b954b2e0ca488".toLowerCase();

      // Contracts for currentPrice calls
      const IFBILL_PRICE_FEED =
        "0x79ECCE8E2D17603877Ff15BC29804CbCB590EC08" as `0x${string}`;
      const FBILL_PRICE_FEED =
        "0x45bafad5a6a531Bc18Cf6CE5B02C58eA4D20589b" as `0x${string}`;

      const PRICE_FEED_ABI = [
        {
          inputs: [],
          name: "currentPrice",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      for (let i = 0; i < marketsData.markets.length; i++) {
        const market = marketsData.markets[i];

        // Check if this market is in the exclusion list
        const isExcluded = addressesToExclude.some(
          (excluded) => excluded.id.toLowerCase() === market.id.toLowerCase()
        );
        if (isExcluded) {
          continue;
        }

        // Default price from DEX query or fallback to 1
        const priceData = prices[i]?.data?.tokenDayDatas?.[0];
        let underlyingTokenPrice = priceData ? Number(priceData.priceUSD) : 1;

        // Override price logic for special collaterals:
        const lowerCaseMarketId = market.id.toLowerCase();
        if (lowerCaseMarketId === USYC_ADDRESS) {
          // Fetch price from API
          try {
            const res = await fetch(
              "https://usyc.hashnote.com/api/price-reports"
            );
            const json = await res.json();
            underlyingTokenPrice = parseFloat(json.data[0].price);
          } catch (err) {
            console.error("Failed to fetch USYC price:", err);
          }
        } else if (lowerCaseMarketId === IFBILL_ADDRESS) {
          // Call currentPrice on IFBILL price feed
          try {
            const priceBN = await readContract({
              address: IFBILL_PRICE_FEED,
              abi: PRICE_FEED_ABI,
              functionName: "currentPrice",
              chainId: CANTO_MAINNET_EVM.chainId,
            });
            // Divide by 1e8 to get the actual price
            underlyingTokenPrice = Number(priceBN) / 1e8;
          } catch (err) {
            console.error("Failed to fetch IFBILL price:", err);
          }
        } else if (lowerCaseMarketId === FBILL_ADDRESS) {
          // Call currentPrice on FBILL price feed
          try {
            const priceBN = await readContract({
              address: FBILL_PRICE_FEED,
              abi: PRICE_FEED_ABI,
              functionName: "currentPrice",
              chainId: CANTO_MAINNET_EVM.chainId,
            });
            // Divide by 1e8 to get the actual price
            underlyingTokenPrice = Number(priceBN) / 1e8;
          } catch (err) {
            console.error("Failed to fetch FBILL price:", err);
          }
        } else if (lowerCaseMarketId === RWA_ADDRESS) {
          underlyingTokenPrice = 0.039;
        }

        const cTokenAddress = lowerCaseMarketId as `0x${string}`;

        // Get on-chain data:
        const [cTotalSupply, totalBorrows] = await Promise.all([
          readContract({
            address: cTokenAddress,
            abi: CERC20_ABI,
            functionName: "totalSupply",
            chainId: CANTO_MAINNET_EVM.chainId,
          }),
          readContract({
            address: cTokenAddress,
            abi: CERC20_ABI,
            functionName: "totalBorrows",
            chainId: CANTO_MAINNET_EVM.chainId,
          }),
        ]);

        // Underlying supplied = cTotalSupply (scaled by underlying decimals)
        const underlyingSupplied =
          Number(cTotalSupply) / 10 ** market.underlyingDecimals;
        const suppliedUSD = underlyingSupplied * underlyingTokenPrice;
        totalSupplied += suppliedUSD;

        const borrowedUSD =
          (Number(totalBorrows) / 10 ** market.underlyingDecimals) *
          underlyingTokenPrice;
        totalBorrowed += borrowedUSD;

        // If this is the cNOTE market, also track these values separately
        if (cTokenAddress === "0xee602429ef7ece0a13e4ffe8dbc16e101049504c") {
          totalNoteSupplied += suppliedUSD;
          totalNoteBorrowed += borrowedUSD;
          totalLiquidNote = borrowedUSD - suppliedUSD;
          totalSupplied -= suppliedUSD;
        }
      }

      setTotalStats({
        totalBorrowed,
        totalSupplied,
        totalNoteBorrowed,
        totalNoteSupplied,
        totalLiquidNote,
      });
    };

    calculateTotals();
  }, [marketsData, apolloClient]);

  if (isLoading || cNote === undefined || stableCoins === undefined) {
    return (
      <div className={styles.loading}>
        <Splash themed />
      </div>
    );
  }

  const supplyTokens = [cNote, ...stableCoins, ...rwas].sort((a, b) =>
    sortCTokens(a, b, "supplyBalanceInUnderlying")
  );
  const borrowedTokens = [...stableCoins, cNote].sort((a, b) =>
    sortCTokens(a, b, "borrowBalance")
  );

  return (
    <div className={clsx(styles.container, "separator")}>
      <Text size="x-lg" font="proto_mono" className={styles.title}>
        Lending
      </Text>
      <Spacer height="20px" />
      <Modal
        open={currentModal !== CLMModalTypes.NONE}
        onClose={() => setCurrentModal(CLMModalTypes.NONE)}
        title="Lending"
        width="32rem"
      >
        {selectedCToken && (
          <LendingModal
            isSupplyModal={currentModal === CLMModalTypes.SUPPLY}
            position={clmPosition.position}
            cToken={selectedCToken}
            transaction={{
              performTx: transaction.performTx,
              validateParams: transaction.validateParams,
            }}
          />
        )}
      </Modal>

      <div className={styles.accountHealth}>
        <AccountHealth
          title="Account Health"
          items={[
            {
              name: "Supplied",
              value: displayAmount(clmPosition.position.totalSupply, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Borrow Limit",
              value: displayAmount(
                clmPosition.general.maxAccountLiquidity,
                18,
                {
                  precision: 2,
                }
              ),
              symbol: true,
            },
            {
              name: "Net APR",
              value: clmPosition.general.netApr + "%",
            },
            {
              name: "Borrowed",
              value: displayAmount(clmPosition.position.totalBorrow, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Liquidity Remaining",
              value: displayAmount(clmPosition.position.liquidity, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Limit Used",
              value: clmPosition.general.percentLimitUsed + "%",
            },
          ]}
          percent={Number(clmPosition.general.percentLimitUsed) / 100}
        />
      </div>
      <div className={styles.highlightCard}>
        <TokenCard
          cToken={cNote}
          items={[
            {
              key: "Circulating Supply",
              value: displayAmount(
                addTokenBalances(
                  lendingStats.circulatingNote,
                  lendingStats.circulatingCNote
                ),
                18
              ),
            },
            {
              key: "Percent Deposited",
              value: formatPercent(
                divideBalances(
                  lendingStats.circulatingCNote,
                  addTokenBalances(
                    lendingStats.circulatingNote,
                    lendingStats.circulatingCNote
                  )
                )
              ),
            },
            {
              key: "RWA TVl",
              value: displayAmount(lendingStats.valueOfAllRWA, 18),
            },
          ]}
          onClick={() => {
            window.open(
              "https://app.slingshot.finance/swap/Canto/NOTE",
              "_blank"
            );
          }}
        />
      </div>

      <div className={clsx(styles.mainTable, "separator")}>
        {isMobile && (
          <div>
            <ToggleGroup
              options={["Supply", "Borrow"]}
              selected={currentToggle}
              setSelected={(value) => {
                if (value === "Borrow" || value === "Supply")
                  setCurrentToggle(value);
                else console.error("invalid toggle value");
              }}
            />
          </div>
        )}
        {(!isMobile || currentToggle === "Supply") && (
          <Container gap={12} width="100%">
            <Text size="x-lg" font="proto_mono">
              SUPPLY
            </Text>
            <Table
              title="Canto Lending Market"
              headerFont="proto_mono"
              headers={[
                {
                  value: "Asset",
                  ratio: 3,
                },
                {
                  value: "APR",
                  ratio: 2,
                },
                {
                  value: "Collateral",
                  ratio: 2,
                },
                {
                  value: "Supplied",
                  ratio: 2,
                },
              ]}
              onRowsClick={supplyTokens.map((cStableCoin) => () => {
                setSelectedCToken(cStableCoin.address);
                setCurrentModal(CLMModalTypes.SUPPLY);
              })}
              content={[
                ...supplyTokens.map((cStableCoin) => [
                  <Container
                    center={{
                      vertical: true,
                    }}
                    width="100%"
                    direction="row"
                    gap={10}
                    style={{
                      paddingLeft: "30px",
                    }}
                    key={"title" + cStableCoin.address}
                    onClick={
                      cStableCoin.address !== cNote.address
                        ? () => {
                            setSelectedCToken(cStableCoin.address);
                            setCurrentModal(CLMModalTypes.SUPPLY);
                          }
                        : undefined
                    }
                  >
                    <Icon
                      icon={{ url: cStableCoin.underlying.logoURI, size: 30 }}
                    />
                    <Container
                      style={{
                        alignItems: "flex-start",
                      }}
                    >
                      <Text font="proto_mono">
                        {cStableCoin.underlying.symbol}
                      </Text>
                      <Text theme="secondary-dark" size="x-sm">
                        Bal:{" "}
                        {displayAmount(
                          cStableCoin.userDetails?.balanceOfUnderlying ?? "0",
                          cStableCoin.underlying.decimals,
                          {
                            precision: 2,
                          }
                        )}
                      </Text>
                    </Container>
                  </Container>,
                  cStableCoin.supplyApr + "%",
                  displayAmount(cStableCoin.collateralFactor, 16) + "%",
                  cStableCoin.userDetails?.supplyBalanceInUnderlying == null ||
                  cStableCoin.userDetails?.supplyBalanceInUnderlying === "0"
                    ? "-"
                    : displayAmount(
                        cStableCoin.userDetails?.supplyBalanceInUnderlying ??
                          "0",
                        cStableCoin.underlying.decimals,
                        {
                          precision: 2,
                        }
                      ),
                ]),
              ]}
            />
          </Container>
        )}
        {(!isMobile || currentToggle === "Borrow") && (
          <Container gap={12} width="100%">
            <Text size="x-lg" font="proto_mono">
              Borrow
            </Text>
            <Table
              title="Canto Lending Market"
              headerFont="proto_mono"
              headers={[
                {
                  value: "Asset",
                  ratio: 3,
                },
                {
                  value: "APR",
                  ratio: 2,
                },
                {
                  value: "Liquidity",
                  ratio: 2,
                },
                {
                  value: "Borrowed",
                  ratio: 2,
                },
              ]}
              onRowsClick={borrowedTokens.map((borrowedToken) => () => {
                setSelectedCToken(borrowedToken.address);
                setCurrentModal(CLMModalTypes.BORROW);
              })}
              content={[
                ...borrowedTokens.map((borrowedToken) => [
                  <Container
                    center={{
                      vertical: true,
                    }}
                    width="100%"
                    direction="row"
                    gap={10}
                    style={{
                      paddingLeft: "30px",
                    }}
                    key={"title" + borrowedToken.address}
                  >
                    <Icon
                      icon={{
                        url: borrowedToken.underlying.logoURI,
                        size: 30,
                      }}
                    />
                    <Container
                      style={{
                        alignItems: "flex-start",
                      }}
                    >
                      <Text font="proto_mono">
                        {borrowedToken.underlying.symbol}
                      </Text>
                      <Text theme="secondary-dark" size="x-sm">
                        Bal:{" "}
                        {displayAmount(
                          borrowedToken.userDetails?.balanceOfUnderlying ?? "0",
                          borrowedToken.underlying.decimals,
                          {
                            precision: 2,
                          }
                        )}
                      </Text>
                    </Container>
                  </Container>,
                  borrowedToken.borrowApr + "%",
                  displayAmount(borrowedToken.liquidity, 0),
                  borrowedToken.userDetails?.borrowBalance == null ||
                  borrowedToken.userDetails?.borrowBalance === "0"
                    ? "-"
                    : displayAmount(
                        borrowedToken.userDetails?.borrowBalance ?? "0",
                        borrowedToken.underlying.decimals,
                        {
                          precision: 2,
                        }
                      ),
                ]),
              ]}
            />
          </Container>
        )}
      </div>
      <div className={clsx(styles.positionsContainer, "separator")}>
        <div className={styles.positionsHeader}>
          <Text size="x-lg" font="proto_mono">
            Positions
          </Text>
          <Container
            width={isMobile ? "100%" : "200px"}
            style={{ padding: isMobile ? "0 8px 0 8px" : "" }}
          >
            <ToggleGroup
              options={["All", "My"]}
              selected={positionsToggle}
              setSelected={(value) => setPositionsToggle(value as "All" | "My")}
            />
          </Container>
        </div>
        <div>
          <div className={styles.statsContainer}>
            <div className={styles.statsBox}>
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <Text
                    font="rm_mono"
                    color="#767676"
                    size={isMobile ? "md" : "x-sm"}
                  >
                    Total Stables Supplied
                  </Text>
                </div>
                <Container direction="row" center={{ vertical: true }}>
                  <Text
                    font="proto_mono"
                    size={isMobile ? "x-lg" : "lg"}
                    color="#000000"
                  >
                    {totalStats.totalSupplied.toLocaleString() === "0"
                      ? "Loading..."
                      : "$" + totalStats.totalSupplied.toLocaleString()}
                  </Text>
                </Container>
              </div>
            </div>
            <div className={styles.statsBox}>
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <Text
                    font="rm_mono"
                    color="#767676"
                    size={isMobile ? "md" : "x-sm"}
                  >
                    Total Note Borrowed
                  </Text>
                </div>
                <Container direction="row" center={{ vertical: true }}>
                  <Text
                    font="proto_mono"
                    size={isMobile ? "x-lg" : "lg"}
                    color="#000000"
                  >
                    {totalStats.totalNoteBorrowed.toLocaleString() === "0"
                      ? "Loading..."
                      : "$" + totalStats.totalNoteBorrowed.toLocaleString()}
                  </Text>
                </Container>
              </div>
            </div>
            {/* <div className={styles.statsBox}>
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <Text
                    font="rm_mono"
                    color="#767676"
                    size={isMobile ? "md" : "x-sm"}
                  >
                    Total Note Supplied
                  </Text>
                </div>
                <Container direction="row" center={{ vertical: true }}>
                  <Text
                    font="proto_mono"
                    size={isMobile ? "x-lg" : "lg"}
                    color="#000000"
                  >
                    {totalStats.totalNoteSupplied.toLocaleString() === "0"
                      ? "Loading..."
                      : "$" + totalStats.totalNoteSupplied.toLocaleString()}
                  </Text>
                </Container>
              </div>
            </div> */}
            {/* <div className={styles.statsBox}>
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <Text
                    font="rm_mono"
                    color="#767676"
                    size={isMobile ? "md" : "x-sm"}
                  >
                    Total Liquid Note
                  </Text>
                </div>
                <Container direction="row" center={{ vertical: true }}>
                  <Text
                    font="proto_mono"
                    size={isMobile ? "x-lg" : "lg"}
                    color="#000000"
                  >
                    {totalStats.totalLiquidNote.toLocaleString() === "0"
                      ? "Loading..."
                      : "$" + totalStats.totalLiquidNote.toLocaleString()}
                  </Text>
                </Container>
              </div>
            </div> */}
          </div>
        </div>
        <Spacer height="5px" />
        <Table
          title="Positions"
          headerFont="proto_mono"
          headers={[
            {
              value: "Account",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "Borrowed Market",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "Total Supplied",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: (
                <Container direction="row">
                  <Text font="proto_mono">BORROWED AMOUNT</Text>
                </Container>
              ),
              ratio: isMobile ? 0 : 3,
              hideOnMobile: isMobile,
            },
            {
              value: (
                <Container direction="column">
                  <Text font="proto_mono">
                    BORROW BALANCE
                    <Icon
                      id="borrow-balance"
                      icon={{
                        url: "/icons/info.svg",
                        size: 14,
                      }}
                      style={{ marginLeft: "6px", marginTop: "2px" }}
                      themed
                    />
                  </Text>
                  <Tooltip anchorSelect="#borrow-balance" place="top">
                    <Text size="x-sm">
                      Borrow Balance = Borrowed Amount + Interest Accrued
                    </Text>
                  </Tooltip>
                </Container>
              ),
              ratio: isMobile ? 1 : 3,
            },

            {
              value: (
                <Container direction="row">
                  <Text font="proto_mono">
                    HEALTH FACTOR
                    <Icon
                      id="health-factor"
                      icon={{
                        url: "/icons/info.svg",
                        size: 14,
                      }}
                      style={{ marginLeft: "6px", marginTop: "2px" }}
                      themed
                    />
                  </Text>
                  <Tooltip anchorSelect="#health-factor" place="top">
                    <Text size="x-sm">
                      Health Factor = Total Collateral Supplied / Total Borrowed
                    </Text>
                  </Tooltip>
                </Container>
              ),
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "",
              ratio: isMobile ? 1 : 3,
            },
          ]}
          isLoading={allPositionsLoading || myPositionsLoading}
          content={
            paginatedPositions.length > 0
              ? [
                  ...paginatedPositions.map((position, index) => {
                    const borrowedVal = Number(
                      borrowBalances[position.id]?.borrowBalance ?? 0
                    );
                    const suppliedVal = positionsTotalSupplied[position.id];
                    const hf = deriveHealthFactor(suppliedVal, borrowedVal);

                    return [
                      <Container
                        key={`account-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        <Text
                          font="proto_mono"
                          size={isMobile ? "sm" : "md"}
                          onClick={() =>
                            window.open(
                              `https://tuber.build/address/${position.account.id}`,
                              "_blank"
                            )
                          }
                          className={styles.clickableAddress}
                        >
                          {`${position.account.id.slice(
                            0,
                            4
                          )}...${position.account.id.slice(-5)}`}
                          <Icon
                            icon={{
                              url: "/arrow.svg",
                              size: 20,
                            }}
                            themed
                          />
                        </Text>
                      </Container>,
                      <Container
                        key={`market-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                          {position.market.name}
                        </Text>
                      </Container>,
                      <Container
                        key={`total-supplied-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        {positionsTotalSupplied[position.id] != null && (
                          <Icon
                            icon={{
                              url: "/tokens/note.svg",
                              size: 14,
                            }}
                            color="dark"
                            style={{ marginTop: "6px" }}
                            themed={true}
                          />
                        )}
                        <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                          {positionsTotalSupplied[position.id] == null
                            ? "Loading..."
                            : displayAmount(
                                //@ts-ignore
                                positionsTotalSupplied[position.id],
                                0,
                                { precision: 2 }
                              )}
                        </Text>
                      </Container>,
                      isMobile ? null : (
                        <Container
                          key={`borrowed-${index}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <Icon
                            icon={{
                              url: "/tokens/note.svg",
                              size: 14,
                            }}
                            color="dark"
                            style={{ marginTop: "6px" }}
                            themed={true}
                          />
                          <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                            {displayAmount(position.storedBorrowBalance, 0, {
                              precision: 2,
                            })}
                          </Text>
                        </Container>
                      ),
                      <Container
                        key={`balance-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        <Icon
                          icon={{
                            url: "/tokens/note.svg",
                            size: 14,
                          }}
                          color="dark"
                          style={{ marginTop: "6px" }}
                          themed={true}
                        />
                        <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                          {borrowBalances[position.id]
                            ? displayAmount(
                                borrowBalances[position.id].borrowBalance,
                                0,
                                { precision: 2 }
                              )
                            : "Loading..."}
                        </Text>
                      </Container>,
                      <Container
                        key={`health-${index}`}
                        width="100%"
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? 4 : 10}
                        center={{ vertical: true, horizontal: true }}
                        style={{ justifyContent: "center" }}
                      >
                        <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                          {hf}
                        </Text>
                        {hf !== "Loading..." && !isNaN(parseFloat(hf)) && (
                          <HealthBar value={parseFloat(hf)} />
                        )}
                      </Container>,
                      <Container
                        key={`manage-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        {accountLiquidities[position.id] &&
                          BigInt(accountLiquidities[position.id].shortfall) >
                            0n && (
                            <button
                              className={styles.liquidateButton}
                              onClick={() => {
                                if (!address) {
                                  openConnectModal?.();
                                  return;
                                }

                                setSelectedBorrowerPosition(position);
                                setOpenLiquidateModal(true);
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              Liquidate
                            </button>
                          )}
                      </Container>,
                    ];
                  }),
                  <Pagination
                    key="pagination"
                    currentPage={currentPositionsPage}
                    totalPages={totalPages}
                    handlePageClick={handlePositionsPageClick}
                  />,
                ]
              : [
                  <Container
                    key="noData"
                    className={styles.noPositionsContainer}
                  >
                    {!address ? (
                      <>
                        <Text font="proto_mono" size={isMobile ? "md" : "lg"}>
                          PLEASE CONNECT YOUR WALLET
                        </Text>
                        <Spacer height="20px" />
                        <ConnectButton />
                      </>
                    ) : (
                      <Text font="proto_mono" size={isMobile ? "md" : "lg"}>
                        NO POSITIONS FOUND
                      </Text>
                    )}
                  </Container>,
                ]
          }
        />

        <LiquidateModal
          open={openLiquidateModal}
          width="45rem"
          height="min-content"
          title=""
          onClose={() => setOpenLiquidateModal(false)}
        >
          {selectedBorrowerPosition &&
            (() => {
              const borrowedMarketId =
                selectedBorrowerPosition.market.id.toLowerCase();
              const borrowedTokenInfo = CLM_TOKENS.find(
                (t) => t.id.toLowerCase() === borrowedMarketId
              );
              const underlyingDecimals = borrowedTokenInfo?.decimals ?? 18;
              const borrowedAmountInDecimal = parseFloat(
                selectedBorrowerPosition.storedBorrowBalance
              );
              const borrowedMarkets =
                selectedBorrowerPosition?.account.tokens.filter((t: any) => {
                  const supplied = parseFloat(t.totalUnderlyingSupplied);
                  const cf = parseFloat(t.market.collateralFactor);
                  return (
                    supplied > 0 &&
                    cf > 1 &&
                    selectedBorrowerPosition.market.id.toLowerCase() !==
                      t.market.id.toLowerCase()
                  );
                }) || [];

              Object.entries(extraBalances).forEach(([tokenId, balance]) => {
                if (Number(balance) > 0) {
                  const tokenInfo = extraCTokensSupply.find(
                    (t) => t.id === tokenId
                  );
                  if (tokenInfo) {
                    const suppliedStr = balance.toString();

                    borrowedMarkets.push({
                      id: tokenId,
                      market: {
                        name: tokenInfo.name,
                        id: tokenId,
                        collateralFactor: tokenInfo.collateralFactor.toString(),
                      },
                      totalUnderlyingSupplied: suppliedStr,
                    });
                  }
                }
              });
              return (
                <Table
                  title="Choose Collateral To Seize"
                  headerFont="proto_mono"
                  headers={[
                    { value: "Market", ratio: 2 },
                    { value: "Supplied", ratio: 3 },
                    { value: "", ratio: 4 },
                    { value: "", ratio: 3 },
                  ]}
                  content={[
                    ...borrowedMarkets.map((marketToken: any, idx: number) => {
                      const mergedPosition = {
                        ...marketToken,
                      };

                      async function handleMaxButtonClick() {
                        const borrowedMarketId =
                          selectedBorrowerPosition.market.id.toLowerCase();
                        const cTokenCollateral =
                          mergedPosition.market.id.toLowerCase() as `0x${string}`;

                        // Initial guess: 80% of borrowed amount
                        let maxRepay = borrowedAmountInDecimal * 0.8;

                        // Convert guess to BigInt
                        const repayAmountBigInt = parseUnits(
                          maxRepay.toString(),
                          underlyingDecimals
                        );

                        // Call liquidateCalculateSeizeTokens
                        const comptrollerAddress =
                          "0x5E23dC409Fc2F832f83CEc191E245A191a4bCc5C"; // Comptroller
                        const [errorCode, seizeTokens] = await readContract({
                          address: comptrollerAddress,
                          abi: COMPTROLLER_ABI,
                          functionName: "liquidateCalculateSeizeTokens",
                          args: [
                            borrowedMarketId,
                            cTokenCollateral,
                            repayAmountBigInt,
                          ],
                        });

                        if (errorCode !== BigInt(0)) {
                          // If there's an error, just fallback to our original guess
                          setRepayAmounts((prev) => ({
                            ...prev,
                            [mergedPosition.market.id]: maxRepay.toString(),
                          }));
                          return;
                        }

                        // Now get the borrower's collateral cToken balance and underlyingBalance
                        const borrowerAddress =
                          selectedBorrowerPosition.account.id.toLowerCase() as `0x${string}`;

                        const cTokenBalance = await readContract({
                          address: cTokenCollateral,
                          abi: CERC20_ABI,
                          functionName: "balanceOf",
                          args: [borrowerAddress],
                        });

                        const underlyingBalance = cTokenBalance;

                        // If seizeTokens is more than underlyingBalance, we need to scale down
                        if (seizeTokens > underlyingBalance) {
                          // Scale maxRepay so that seizeTokens matches underlyingBalance
                          // Since seizeTokens is proportional to repayAmount, we can do:
                          // newRepay = maxRepay * (underlyingBalance / seizeTokens)
                          // But we must be careful with BigInt division:
                          const scale =
                            Number(underlyingBalance) / Number(seizeTokens);

                          maxRepay = maxRepay * scale;
                        }

                        // Set the input value to the final maxRepay
                        setRepayAmounts((prev) => ({
                          ...prev,
                          [mergedPosition.market.id]: maxRepay.toString(),
                        }));
                      }

                      return [
                        <Container
                          center={{ vertical: true }}
                          width="100%"
                          direction="row"
                          gap={10}
                          style={{ paddingLeft: "30px" }}
                          key={`borrowed-asset-${idx}`}
                        >
                          <Container style={{ alignItems: "flex-start" }}>
                            <Text font="proto_mono">
                              {marketToken.market.name}
                            </Text>
                          </Container>
                        </Container>,
                        <Container
                          key={`borrowed-amount-${idx}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <Text font="proto_mono">
                            <Icon
                              icon={{
                                url: "/tokens/note.svg",
                                size: 14,
                              }}
                              color="dark"
                              style={{ marginTop: "6px", marginRight: "6px" }}
                              themed={true}
                            />

                            {displayAmount(
                              marketToken.totalUnderlyingSupplied,
                              0,
                              { precision: 2 }
                            )}
                          </Text>
                        </Container>,
                        <Container
                          key={`borrowed-amount-${idx}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <InputLiquidate
                            type="amount"
                            height={44}
                            tokenMin="0"
                            balance="0"
                            showBalanceLabel={false}
                            error={false}
                            handleMax={handleMaxButtonClick}
                            tokenMax={String(borrowedAmountInDecimal * 0.8)} // used for MAX calculation
                            decimals={underlyingDecimals}
                            value={repayAmounts[mergedPosition.market.id] || ""}
                            onChange={(e) => {
                              setRepayAmounts((prev) => ({
                                ...prev,
                                [mergedPosition.market.id]: e.target.value,
                              }));
                            }}
                            placeholder="0.0"
                            className={styles["input"]}
                            style={{ textAlign: "left" }} // adjust alignment
                          />
                        </Container>,
                        <Container
                          key={`borrowed-action-${idx}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <button
                            className={styles.liquidateButton}
                            onClick={() =>
                              handleLiquidate(
                                selectedBorrowerPosition,
                                mergedPosition
                              )
                            }
                            disabled={
                              !address ||
                              loadingPositions[mergedPosition.market.id]
                            }
                            style={{
                              opacity: address ? 1 : 0.5,
                              cursor: address ? "pointer" : "not-allowed",
                            }}
                          >
                            {loadingPositions[mergedPosition.market.id]
                              ? "Loading"
                              : "Seize"}
                          </button>
                        </Container>,
                      ];
                    }),
                  ]}
                />
              );
            })()}
        </LiquidateModal>
      </div>
    </div>
  );
}
