"use client";

import { useState, useEffect, useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import Container from "@/components/container/container";
import Button from "@/components/button/button";
import Text from "@/components/text";
import styles from "./swap.module.scss";
import {
  baseV1RouterAddress,
  cantoAddress,
  wCantoAddress as WCANTO,
} from "@/config/consts/addresses";
import { TokenSelector } from "./components/TokenSelector";
import { SwapDetails } from "./components/SwapDetails";
import { ArrowSwap } from "./components/ArrowSwap";
import {
  convertToBigInt,
  getAmountOutMin,
  getHardcodedRoute,
  getSwapDeadline,
  popularTokens,
} from "@/utils/swap/route";
import { useSwapTokens } from "@/hooks/swap/useSwaptokens";
import SelectTokenModal from "./components/SelectTokenModal";
import { useAddressTokenBalancesQuery } from "@/hooks/swap/useAddressTokenBalances";
import { CANTO_MAINNET_EVM } from "@/config/networks";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { ERC20_ABI } from "@/config/abis";
import { useToast } from "@/components/toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatBalance } from "@/utils/formatting";
import { useQueryClient } from "@tanstack/react-query";

const WCANTO_ABI = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function Page() {
  const [tokenA, setTokenA] = useState(popularTokens[0]);
  const [tokenB, setTokenB] = useState<(typeof popularTokens)[] | undefined>();
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [arrowFlip, setArrowFlip] = useState(false);
  const { address } = useAccount();
  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const GAS_BUFFER_CANTO = 0.02;

  const [modalOpen, setModalOpen] = useState(false);
  const [whichSide, setWhichSide] = useState<"pay" | "receive">();
  const [isApproving, setIsApproving] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);
  const queryClient = useQueryClient();

  const {
    swapExactCantoForTokens,
    swapExactTokensForCanto,
    swapExactTokensForTokens,
    isLoading: isSwapping,
    isSwapSuccess,
  } = useSwapTokens();

  const { data: tokenBalances } = useAddressTokenBalancesQuery(address);

  const { data: cantoBalance } = useBalance({
    chainId: CANTO_MAINNET_EVM.chainId,
    address: address as `0x${string}`,
  });

  const route = useMemo(() => {
    //@ts-expect-error: type exists
    return getHardcodedRoute(tokenA, tokenB) ?? [];
  }, [tokenA, tokenB]);

  const balanceMap = useMemo(() => {
    const map: Record<string, string> = {};

    tokenBalances?.forEach((b) => {
      map[b.token.address.toLowerCase()] = formatBalance(
        b.value.toString(),
        b.token.decimals
      );
    });

    map[cantoAddress.toLowerCase()] = formatBalance(
      cantoBalance?.value.toString() ?? "0",
      18
    );

    return map;
  }, [tokenBalances, cantoBalance]);

  useEffect(() => {
    if (isSwapSuccess) {
      setPayAmount("");
    }
  }, [isSwapSuccess]);

  /* gas estimate (optional) ------------------------------------------ */
  //   const gasFee = useEstimateSwapGasFee({
  //     amountIn: convertToBigInt(payAmount || "0", tokenA.decimals),
  //     amountOutMin: convertToBigInt(receiveAmount || "0", tokenB?.decimals ?? 18),
  //     deadline: getSwapDeadline(),
  //     path: route,
  //     selectedTokenA: tokenA,
  //     selectedTokenB: tokenB,
  //   });

  const gasFee = 0;

  const [oneRate, setOneRate] = useState<string>("");

  function isWrapPair(tokA: Address, tokB?: Address) {
    if (!tokB) return false;
    const a = tokA.toLowerCase();
    const b = tokB.toLowerCase();
    return (
      (a === cantoAddress.toLowerCase() && b === WCANTO.toLowerCase()) ||
      (a === WCANTO.toLowerCase() && b === cantoAddress.toLowerCase())
    );
  }

  const balanceA = useMemo(() => {
    if (!tokenA) return "0";

    if (!address) return "0";

    if (tokenA.address.toLowerCase() === cantoAddress.toLowerCase())
      return formatBalance(cantoBalance?.value.toString() ?? "0", 18);

    const entry = tokenBalances?.find(
      (b) => b.token.address.toLowerCase() === tokenA.address.toLowerCase()
    );
    return entry
      ? formatBalance(entry.value.toString(), entry.token.decimals)
      : "0";
  }, [tokenA, tokenBalances, cantoBalance]);

  const balanceB = useMemo(() => {
    if (!tokenB || !tokenBalances) return "0";

    if (!address) return "0";
    //@ts-expect-error : type exists
    if (tokenB.address.toLowerCase() === cantoAddress.toLowerCase())
      return formatBalance(cantoBalance?.value.toString() ?? "0", 18);

    const entry = tokenBalances.find(
      //@ts-expect-error : type exists
      (b) => b.token.address.toLowerCase() === tokenB.address.toLowerCase()
    );
    return entry
      ? formatBalance(entry.value.toString(), entry.token.decimals)
      : "0";
  }, [tokenB, tokenBalances, cantoBalance]);

  useEffect(() => {
    if (!tokenB || !payAmount) return setReceiveAmount("");
    //@ts-expect-error : type exists
    if (isWrapPair(tokenA.address, tokenB.address)) {
      setReceiveAmount(payAmount);
      return;
    }

    (async () => {
      try {
        const { expectedOut } = await getAmountOutMin(
          convertToBigInt(payAmount, tokenA.decimals),
          route,
          0.5
        );
        //@ts-expect-error : type exists
        setReceiveAmount(formatUnits(expectedOut, tokenB.decimals));
      } catch {
        setReceiveAmount("");
        setOneRate("");
      }
    })();
  }, [tokenA, tokenB, payAmount]);

  useEffect(() => {
    if (!tokenA || !tokenB) return setOneRate("");

    //@ts-expect-error : type exists
    if (isWrapPair(tokenA.address, tokenB.address)) {
      setOneRate("1");
      return;
    }

    (async () => {
      const { expectedOut: oneOut } = await getAmountOutMin(
        convertToBigInt("1", tokenA.decimals),
        route,
        0.5
      );
      //@ts-expect-error : type exists
      setOneRate(formatUnits(oneOut, tokenB.decimals));
    })();
  }, [tokenA, tokenB, payAmount]);

  function openModal(side: "pay" | "receive") {
    if (address) {
      setWhichSide(side);
      setModalOpen(true);
    } else {
      if (openConnectModal) {
        openConnectModal();
      }
    }
  }

  async function onSwap() {
    if (!tokenB || !payAmount) return;

    const isWrap =
      tokenA.address.toLowerCase() === cantoAddress.toLowerCase() &&
      //@ts-expect-error : type exists
      tokenB.address.toLowerCase() === WCANTO.toLowerCase();

    const isUnwrap =
      tokenA.address.toLowerCase() === WCANTO.toLowerCase() &&
      //@ts-expect-error : type exists
      tokenB.address.toLowerCase() === cantoAddress.toLowerCase();

    if (isWrap || isUnwrap) {
      try {
        setIsWrapping(true);

        const inWei = convertToBigInt(payAmount, 18);
        const fn = isWrap ? "deposit" : "withdraw";

        const txHash = await writeContract({
          abi: WCANTO_ABI,
          address: WCANTO as `0x${string}`,
          functionName: fn,
          //@ts-expect-error : type exists
          args: isUnwrap ? [inWei] : [],
          //@ts-expect-error : type exists
          value: isWrap ? inWei : undefined,
          chainId: CANTO_MAINNET_EVM.chainId,
        });

        await waitForTransaction({
          hash: txHash?.hash,
        });

        queryClient.invalidateQueries({
          queryKey: ["address-token-balances", address],
        });

        toast.add({
          primary: "Transaction Successful",
          state: "success",
          duration: 4000,
        });

        setPayAmount("");
      } catch (err) {
        queryClient.invalidateQueries({
          queryKey: ["address-token-balances", address],
        });
        toast.add({
          primary: "Transaction Failed",
          state: "failure",
          duration: 4000,
        });
      } finally {
        setIsWrapping(false);
        queryClient.invalidateQueries({
          queryKey: ["address-token-balances", address],
        });
      }
      return;
    }

    setIsApproving(false);
    try {
      const inWei = convertToBigInt(payAmount, tokenA.decimals);
      const { amountOutMin } = await getAmountOutMin(inWei, route, 0);

      if (tokenA.address.toLowerCase() !== cantoAddress.toLowerCase()) {
        const allowance: bigint = await readContract({
          abi: ERC20_ABI,
          address: tokenA.address as `0x${string}`,
          functionName: "allowance",
          args: [address!, baseV1RouterAddress],
          chainId: CANTO_MAINNET_EVM.chainId,
        });

        if (allowance < inWei) {
          setIsApproving(true);

          const approveHash = await writeContract({
            abi: ERC20_ABI,
            address: tokenA.address as `0x${string}`,
            functionName: "approve",
            args: [baseV1RouterAddress, 2n ** 256n - 1n],
            chainId: CANTO_MAINNET_EVM.chainId,
          });

          //@ts-expect-error : type exists
          await waitForTransaction({ hash: approveHash });
          toast.add({
            primary: "Approve Successful",
            duration: 4000,
            state: "success",
          });
          setIsApproving(false);
        }
      }

      /* ── 2. perform the swap ────────────────────────────────────── */
      if (tokenA.address.toLowerCase() === cantoAddress.toLowerCase()) {
        swapExactCantoForTokens(inWei, amountOutMin, getSwapDeadline(), route);
        //@ts-expect-error : type exists
      } else if (tokenB.address.toLowerCase() === cantoAddress.toLowerCase()) {
        swapExactTokensForCanto(inWei, amountOutMin, getSwapDeadline(), route);
      } else {
        swapExactTokensForTokens(inWei, amountOutMin, getSwapDeadline(), route);
      }
    } catch (err) {
      setIsApproving(false); // ensure UI unlocks
      console.error("Approve / swap failed:", err);
    }
  }

  const actionPending = isApproving || isSwapping || isWrapping;
  const actionLabel = isApproving
    ? "Approving…"
    : isSwapping || isWrapping
      ? "Swapping…"
      : "Swap";

  return (
    <div className={styles.container}>
      <Container direction="column" width="min-content">
        <Text size="x-lg" font="proto_mono" className={styles.title}>
          Swap
        </Text>
        <Container direction="column" gap={5} className={styles.card}>
          <TokenSelector
            label="PAY"
            token={tokenA}
            amount={payAmount}
            onAmount={setPayAmount}
            onSelect={() => openModal("pay")}
            balance={balanceA}
            onMax={() => {
              if (tokenA.address.toLowerCase() === cantoAddress.toLowerCase()) {
                const bal = Number(balanceA);
                const safe =
                  bal > GAS_BUFFER_CANTO ? bal - GAS_BUFFER_CANTO : 0;
                setPayAmount(safe.toString());
              } else {
                setPayAmount(balanceA);
              }
            }}
          />
          <ArrowSwap
            flipped={arrowFlip}
            onClick={() => {
              if (tokenB) {
                setTokenA(tokenB ?? tokenA);
                setTokenB(tokenA);
                setArrowFlip(!arrowFlip);
              }
            }}
          />
          <TokenSelector
            label="RECEIVE"
            //@ts-expect-error : type exists
            token={tokenB}
            amount={receiveAmount}
            disabled
            onSelect={() => openModal("receive")}
            balance={balanceB}
          />
          <div style={{ marginTop: "16px" }}>
            {address ? (
              <Button
                disabled={
                  actionPending ||
                  !payAmount ||
                  !tokenB ||
                  !address ||
                  Number(payAmount) > Number(balanceA)
                }
                onClick={onSwap}
                width="fill"
              >
                {actionLabel}
              </Button>
            ) : (
              <Button onClick={openConnectModal} width="fill">
                Connect Wallet
              </Button>
            )}
          </div>
        </Container>
      </Container>
      <Container direction="column" className={styles.rateContainer}>
        <SwapDetails
          conversionRate={oneRate}
          gasFee={BigInt(gasFee)}
          routePath={route}
          tokenA={tokenA}
          //@ts-expect-error : type exists
          tokenB={tokenB}
        />
      </Container>

      <SelectTokenModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        balances={balanceMap}
        currentA={tokenA?.address ?? ""}
        //@ts-expect-error : type exists
        currentB={tokenB?.address ?? ""}
        onSelect={(tok: any) => {
          if (whichSide === "pay") setTokenA(tok);
          else setTokenB(tok);
        }}
      />
    </div>
  );
}
