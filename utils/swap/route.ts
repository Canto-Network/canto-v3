import { baseV1RouterAbi } from "@/config/abis/router";
import { baseV1RouterAddress } from "@/config/consts/addresses";
import { HARD_CODED_ROUTES, RouteLeg } from "@/config/consts/routes";
import { CANTO_MAINNET_EVM } from "@/config/networks";
import { readContract } from "@wagmi/core";

export const getHardcodedRoute = (
  tokenA?: any,
  tokenB?: any
): RouteLeg[] | undefined => {
  if (!tokenA || !tokenB) {
    return;
  }
  const key = `${tokenA.symbol.toLowerCase()}-${tokenB.symbol.toLowerCase()}`;
  return HARD_CODED_ROUTES[key];
};

export async function getAmountOutMin(
  amountInWei: bigint,
  route: RouteLeg[],
  slippagePct = 0.5
) {
  console.log("get amounts out", amountInWei, route);
  const amounts = (await readContract({
    abi: baseV1RouterAbi,
    address: baseV1RouterAddress,
    functionName: "getAmountsOut",
    args: [amountInWei, route] as const,
    chainId: CANTO_MAINNET_EVM.chainId,
  })) as bigint[];

  const expectedOut = amounts[amounts.length - 1];
  const slippageBips = BigInt(Math.floor(slippagePct * 100));
  const amountOutMin = expectedOut - (expectedOut * slippageBips) / 10_000n;

  return { expectedOut, amountOutMin };
}

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
