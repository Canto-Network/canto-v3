import { useToast } from "@/components/toast";
import { baseV1RouterAbi } from "@/config/abis/router";
import { baseV1RouterAddress } from "@/config/consts/addresses";
import { useQueryClient } from "@tanstack/react-query";
import {
  Address,
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type RouteItemType = {
  from: Address;
  to: Address;
  stable: boolean;
};

export const useSwapTokens = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { refetch: refetchCanto } = useBalance({ address });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: baseV1RouterAddress,
    abi: baseV1RouterAbi,
    functionName: "swapExactTokensForTokens",
    //@ts-expect-error : type exists
    args: [],
    enabled: false,
  });

  const {
    writeAsync,
    isLoading: isSending,
    data: txData,
    //@ts-expect-error : type exists
  } = useContractWrite({ ...config, mode: "recklesslyUnprepared" });

  const { isLoading: isWaiting, isSuccess: isSwapSuccess } =
    useWaitForTransaction({
      hash: txData?.hash,
      onSuccess() {
        if (address) {
          queryClient.invalidateQueries({
            queryKey: ["address-token-balances", address],
          });
        }
        refetchCanto();
      },
    });

  async function executeSwap(
    fn:
      | "swapExactTokensForTokens"
      | "swapExactTokensForCANTO"
      | "swapExactCANTOForTokens",
    args: readonly unknown[],
    value?: bigint
  ) {
    try {
      await writeAsync?.({
        address: baseV1RouterAddress,
        abi: baseV1RouterAbi,
        functionName: fn,
        //@ts-expect-error : type exists
        args,
        value,
      });
    } catch (err) {
      toast.add({
        primary: "Transaction Failed",
        state: "failure",
        duration: 4000,
      });
      throw err;
    }
  }

  const swapExactTokensForTokens = (
    amountIn: bigint,
    amountOutMin: bigint,
    deadline: bigint,
    path: RouteItemType[]
  ) =>
    executeSwap("swapExactTokensForTokens", [
      amountIn,
      amountOutMin,
      path,
      address!,
      deadline,
    ]);

  const swapExactTokensForCanto = (
    amountIn: bigint,
    amountOutMin: bigint,
    deadline: bigint,
    path: RouteItemType[]
  ) =>
    executeSwap("swapExactTokensForCANTO", [
      amountIn,
      amountOutMin,
      path,
      address!,
      deadline,
    ]);

  const swapExactCantoForTokens = (
    amountIn: bigint,
    amountOutMin: bigint,
    deadline: bigint,
    path: RouteItemType[]
  ) =>
    executeSwap(
      "swapExactCANTOForTokens",
      [amountOutMin, path, address!, deadline],
      amountIn // msg.value
    );

  return {
    isLoading: isSending || isWaiting,
    isSwapSuccess,
    swapExactTokensForTokens,
    swapExactTokensForCanto,
    swapExactCantoForTokens,
  };
};
