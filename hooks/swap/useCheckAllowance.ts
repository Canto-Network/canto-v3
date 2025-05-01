import { ERC20_ABI } from "@/config/abis";
import { baseV1RouterAddress } from "@/config/consts/addresses";
import { readContract } from "@wagmi/core";
import { type Address } from "viem";
import { useAccount } from "wagmi";

export const useCheckAllowance = () => {
  const { address } = useAccount();

  const checkAllowance = async (
    amountNeeded: bigint,
    tokenAddress: Address
  ) => {
    console.log("check allowance", amountNeeded, tokenAddress);
    try {
      const allowance = await readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [address!, baseV1RouterAddress],
      });
      if (allowance) {
        if (allowance >= amountNeeded) {
          return true;
        }
        return false;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return { checkAllowance };
};
