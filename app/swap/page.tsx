"use client";

import { useState, useEffect, useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import Container from "@/components/container/container";
import Button from "@/components/button/button";
import Text from "@/components/text";
import styles from "./swap.module.scss";
import { baseV1RouterAddress, cantoAddress } from "@/config/consts/addresses";
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
import BigNumber from "bignumber.js";
import { useSwapTokens } from "@/hooks/swap/useSwaptokens";
import SelectTokenModal from "./components/SelectTokenModal";
import { useAddressTokenBalancesQuery } from "@/hooks/swap/useAddressTokenBalances";
import { CANTO_MAINNET_EVM } from "@/config/networks";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { ERC20_ABI } from "@/config/abis";
import { useToast } from "@/components/toast";

export default function Page() {
  const [tokenA, setTokenA] = useState(popularTokens[0]);
  const [tokenB, setTokenB] = useState<(typeof popularTokens)[] | undefined>();
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [arrowFlip, setArrowFlip] = useState(false);
  const { address } = useAccount();
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [whichSide, setWhichSide] = useState<"pay" | "receive">();
  const [isApproving, setIsApproving] = useState(false);

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
    return getHardcodedRoute(tokenA, tokenB) ?? [];
  }, [tokenA, tokenB]);

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

  function asUiBalance(v: bigint, decimals: number) {
    return new BigNumber(v.toString())
      .div(new BigNumber(10).pow(decimals))
      .toFixed(decimals > 6 ? 6 : decimals);
  }

  const balanceA = useMemo(() => {
    if (!tokenA) return "0";

    if (!address) return "0";

    if (tokenA.address.toLowerCase() === cantoAddress.toLowerCase())
      return asUiBalance(cantoBalance?.value ?? 0n, 18);

    const entry = tokenBalances?.find(
      (b) => b.token.address.toLowerCase() === tokenA.address.toLowerCase()
    );
    return entry ? asUiBalance(entry.value, entry.token.decimals) : "0";
  }, [tokenA, tokenBalances, cantoBalance]);

  const balanceB = useMemo(() => {
    if (!tokenB || !tokenBalances) return "0";

    if (!address) return "0";
    //@ts-expect-error : type exists
    if (tokenB.address.toLowerCase() === cantoAddress.toLowerCase())
      return asUiBalance(cantoBalance?.value ?? 0n, 18);

    const entry = tokenBalances.find(
      //@ts-expect-error : type exists
      (b) => b.token.address.toLowerCase() === tokenB.address.toLowerCase()
    );
    return entry ? asUiBalance(entry.value, entry.token.decimals) : "0";
  }, [tokenB, tokenBalances, cantoBalance]);

  useEffect(() => {
    if (!tokenB || !payAmount) return setReceiveAmount("");

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
    setWhichSide(side);
    setModalOpen(true);
  }

  async function onSwap() {
    if (!tokenB || !payAmount) return;

    setIsApproving(false); // reset old state
    try {
      const inWei = convertToBigInt(payAmount, tokenA.decimals);
      const { amountOutMin } = await getAmountOutMin(inWei, route, 0);

      /* ── 1. ERC-20 approval (skip if CANTO) ─────────────────────── */
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
            onMax={() => setPayAmount(balanceA)}
          />
          <ArrowSwap
            flipped={arrowFlip}
            onClick={() => {
              setTokenA(tokenB ?? tokenA);
              setTokenB(tokenA);
              setArrowFlip(!arrowFlip);
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
            <Button
              disabled={
                isApproving ||
                isSwapping ||
                !payAmount ||
                !tokenB ||
                !address ||
                Number(payAmount) > Number(balanceA)
              }
              onClick={onSwap}
              width="fill"
            >
              {isApproving ? "Approving…" : isSwapping ? "Swapping…" : "Swap"}
            </Button>
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
        onSelect={(tok: any) => {
          if (whichSide === "pay") setTokenA(tok);
          else setTokenB(tok);
        }}
      />
    </div>
  );
}
