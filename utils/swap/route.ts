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
