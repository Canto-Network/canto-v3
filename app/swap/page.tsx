"use client";

import { useState, useEffect, useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import Container from "@/components/container/container";
import Spacer from "@/components/layout/spacer";
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import Text from "@/components/text";
import Icon from "@/components/icon/icon";

import styles from "./swap.module.scss";

import { cantoAddress } from "@/config/consts/addresses";
import { TokenSelector } from "./components/TokenSelector";
import { SwapDetails } from "./components/SwapDetails";
import { ArrowSwap } from "./components/ArrowSwap";
import { getAmountOutMin, getHardcodedRoute } from "@/utils/swap/route";
import BigNumber from "bignumber.js";
import { useSwapTokens } from "@/hooks/swap/useSwaptokens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SelectTokenModal from "./components/SelectTokenModal";
import { useAddressTokenBalancesQuery } from "@/hooks/swap/useAddressTokenBalances";
import { CANTO_MAINNET_EVM } from "@/config/networks";

export const popularTokens: ReadonlyArray<any> = [
  {
    name: "CANTO",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    symbol: "CANTO",
    decimals: "18",
    iconURL: "/icons/canto.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
  {
    name: "Wrapped Canto",
    address: "0x826551890Dc65655a0Aceca109aB11AbDbD7a07B",
    symbol: "wCANTO",
    decimals: "18",
    iconURL: "/icons/canto.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
  {
    name: "Note",
    address: "0x4e71A2E537B7f9D9413D3991D37958c0b5e1e503",
    symbol: "NOTE",
    decimals: "18",
    iconURL: "/icons/note.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
  {
    name: "USD Tether",
    address: "0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75",
    symbol: "USDT",
    decimals: "6",
    iconURL: "/icons/usdt.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
  {
    name: "USD Coin",
    address: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
    symbol: "USDC",
    decimals: "6",
    iconURL: "/icons/usdc.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
  {
    name: "Ethereum",
    address: "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687",
    symbol: "ETH",
    decimals: "18",
    iconURL: "/icons/eth.svg",
    type: "ERC-20",
    circulatingMarketCap: null,
  },
] as const;

export const convertToBigInt = (
  amount: string,
  decimals: number = 0
): bigint => {
  try {
    BigNumber.set({ EXPONENTIAL_AT: 35 });
    if (Number.isNaN(Number(amount)) || !amount) {
      throw new Error("Invalid amount");
    }
    const decimalIndex = amount.indexOf(".");
    const truncatedAmount =
      decimalIndex === -1
        ? amount
        : amount.slice(0, decimalIndex + decimals + 1);
    const bigNumber = new BigNumber(truncatedAmount);
    const multiplier = new BigNumber(10).pow(decimals);
    const convertedAmount = bigNumber.multipliedBy(multiplier);
    return BigInt(convertedAmount.toString());
  } catch (err) {
    return BigInt(0);
  }
};

export const getSwapDeadline = () => {
  return BigInt(Math.ceil(Date.now() / 1000) + 600);
};

export const reactQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function getTokenBalance(t?: (typeof popularTokens)[number]): string {
  if (!t) return "0";

  /* native CANTO uses wagmi's useBalance later – for now keep 0 */
  if (t.address.toLowerCase() === cantoAddress.toLowerCase()) return "0";

  //@ts-expect-error : type exists

  const entry = tokenBalances?.find(
    (b: any) => b.token.address.toLowerCase() === t.address.toLowerCase()
  );
  if (!entry) return "0";

  return new BigNumber(entry.value.toString())
    .dividedBy(new BigNumber(10).pow(entry.token.decimals))
    .toFixed(entry.token.decimals > 6 ? 6 : entry.token.decimals); // 500.10
}

export default function Page() {
  const [tokenA, setTokenA] = useState(popularTokens[0]);
  const [tokenB, setTokenB] = useState<(typeof popularTokens)[] | undefined>();
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [arrowFlip, setArrowFlip] = useState(false);
  const { address } = useAccount();

  const [modalOpen, setModalOpen] = useState(false);
  const [whichSide, setWhichSide] = useState<"pay" | "receive">();

  //   const { isAllowanceApproved, approve } = useApprove(tokenA);
  const isAllowanceApproved = true;
  const {
    swapExactCantoForTokens,
    swapExactTokensForCanto,
    swapExactTokensForTokens,
    isLoading: isSwapping,
  } = useSwapTokens();

  const { data: tokenBalances } = useAddressTokenBalancesQuery(address);

  const { data: cantoBalance } = useBalance({
    chainId: CANTO_MAINNET_EVM.chainId,
    address: address as `0x${string}`,
  });

  console.log("tokenBalances", cantoBalance);

  const route = useMemo(() => {
    return getHardcodedRoute(tokenA, tokenB) ?? [];
  }, [tokenA, tokenB]);

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

    const inWei = convertToBigInt(payAmount, tokenA.decimals);
    const { amountOutMin } = await getAmountOutMin(inWei, route, 0);

    // if (!isAllowanceApproved) {
    //   await approve(inWei);
    //   return;
    // }

    if (tokenA.address === cantoAddress) {
      swapExactCantoForTokens(inWei, amountOutMin, getSwapDeadline(), route);
      //@ts-expect-error : type exists
    } else if (tokenB.address === cantoAddress) {
      swapExactTokensForCanto(inWei, amountOutMin, getSwapDeadline(), route);
    } else {
      swapExactTokensForTokens(inWei, amountOutMin, getSwapDeadline(), route);
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
              disabled={isSwapping || !payAmount || !tokenB || !address}
              onClick={onSwap}
              width="fill"
            >
              {isSwapping ? "Swapping…" : "Swap"}
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
