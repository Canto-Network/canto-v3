import { useEffect, useState } from "react";
import { getCosmosTokenBalance } from "@/utils/cosmos";
import { GRAVITY_BRIDGE } from "@/config/networks";
import { ethToGravity } from "@gravity-bridge/address-converter";
import { Address } from "viem";

export function useGravityBridgeBalance(address: Address, token: string) {
  const [balanceData, setBalanceData] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        const { data, error } = await getCosmosTokenBalance(
          GRAVITY_BRIDGE.chainId,
          ethToGravity(address),
          token === "USDC"
            ? "gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            : token === "USDT"
              ? "gravity0xdAC17F958D2ee523a2206206994597C13D831ec7"
              : "gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        );
        if (isMounted) {
          setBalanceData(data);
          setBalanceError(error);
        }
      } catch (err) {
        if (isMounted) {
          setBalanceError(err as Error);
        }
      }
    };

    fetchBalance();

    const intervalId = setInterval(() => {
      fetchBalance();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [address, token]);

  return { data: balanceData, error: balanceError };
}
