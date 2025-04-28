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
  slippagePct = 0.5 // 0.5 % default
) {
  console.log("get amounts out", amountInWei, route);
  // wagmi v2 signature: readContract(config, { ...params })
  const amounts = (await readContract({
    abi: baseV1RouterAbi,
    address: baseV1RouterAddress,
    functionName: "getAmountsOut",
    args: [amountInWei, route] as const,
    chainId: CANTO_MAINNET_EVM.chainId,
  })) as bigint[]; // e.g. [amountIn, hop1, hop2, amountOut]

  console.log("amounts out", amounts);

  const expectedOut = amounts[amounts.length - 1];
  const slippageBips = BigInt(Math.floor(slippagePct * 100)); // 0.5 → 50 bp
  const amountOutMin = expectedOut - (expectedOut * slippageBips) / 10_000n;

  return { expectedOut, amountOutMin };
}
