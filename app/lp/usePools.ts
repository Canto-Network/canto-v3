"use client";

import { useState, useEffect, useMemo } from "react";
import { Address, Hex } from "viem";
import { writeContract } from "@wagmi/core";
import useCantoSigner from "@/hooks/helpers/useCantoSigner";

import {
  CrocPool,
  CrocUserPosition,
  enrichPool,
  listAllPools,
  listUserPositions,
  watchDexEvents,
} from "@/hooks/pairs/useCrocData";
import { CROCSWAP } from "@/config/consts/addresses";
import { CROCDEX_ABI } from "@/config/abis/crocdex";

export default function usePools() {
  const { signer } = useCantoSigner();
  const connectedEthAccount = signer?.account.address as Address | undefined;

  const [allPools, setAllPools] = useState<CrocPool[]>([]);
  const [positions, setPositions] = useState<CrocUserPosition[]>([]);
  const [loadingPools, setLoadingPools] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    (async () => {
      setLoadingPools(true);
      setAllPools(await listAllPools());
      setLoadingPools(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingPools(true);
      // 1) fetch the raw CrocPools
      const rawPools = await listAllPools();
      // 2) enrich each one (adds .stats, .totals, etc.)
      const enriched = await Promise.all(rawPools.map(enrichPool));
      // 3) store
      setAllPools(enriched);
      setLoadingPools(false);
    })();
  }, []);

  const refetchUser = async (addr: Address | undefined) => {
    if (!addr) {
      setPositions([]);
      setLoadingUser(false);
      return;
    }
    setLoadingUser(true);
    setPositions(await listUserPositions(addr));
    setLoadingUser(false);
  };

  useEffect(() => {
    refetchUser(connectedEthAccount);
  }, [connectedEthAccount, allPools]);

  useEffect(() => {
    const unwatch = watchDexEvents(() => refetchUser(connectedEthAccount));
    return unwatch;
  }, [connectedEthAccount]);

  const [selectedPair, setPair] = useState<string | null>(null);
  const [filteredPairs, setFilteredPairs] = useState<
    "all" | "stable" | "volatile"
  >("all");

  interface TxParams {
    callpath?: number;
    directive?: Hex;
  }

  const validateCrocTx = ({ callpath, directive }: TxParams) => {
    if (!connectedEthAccount) return { error: true, reason: "Connect wallet" };
    if (!selectedPair) return { error: true, reason: "Select a pool" };
    if (callpath === undefined || !directive)
      return { error: true, reason: "Tx not ready" };
    return { error: false } as const;
  };

  const sendCrocTx = async ({ callpath, directive }: TxParams) => {
    const check = validateCrocTx({ callpath, directive });
    if (check.error) throw new Error(check.reason);
    const hash = await writeContract({
      address: CROCSWAP,
      abi: CROCDEX_ABI,
      functionName: "userCmd",
      args: [callpath!, directive!],
    });
    // auto-clear modal on success
    setPair(null);
    return hash;
  };

  const totalRewardsWei = positions.reduce(
    (s, p) => s + p.pendingRewardsWei,
    0n
  );
  const rewards = { total: totalRewardsWei };
  const rewardTime = 0n;

  const pairs = useMemo(() => {
    const userPools = positions.map((p) => p.pool);
    return {
      userAmbient: userPools,
      userCantoDex: [],
      allAmbient: allPools,
      allCantoDex: [],
    };
  }, [positions, allPools]);

  const sortedCantoDexPairs = allPools.sort((a, b) =>
    a.symbol.localeCompare(b.symbol)
  );

  return {
    isLoading: {
      cantoDex: loadingPools,
      ambient: loadingPools,
    },
    pairs,
    rewards,
    rewardTime,
    filteredPairs,
    setFilteredPairs,
    selectedPair,
    setPair,
    sortedCantoDexPairs,
    /* old names kept so page.tsx compiles */
    validateCantoDexTx: validateCrocTx,
    sendCantoDexTxFlow: sendCrocTx,
    validateAmbientTxParams: validateCrocTx,
    sendAmbientTxFlow: sendCrocTx,
    sendClaimRewardsFlow: () => Promise.resolve(), // stub
    pairNames: {
      all: "All Pairs",
      stable: "Stable Pairs",
      volatile: "Volatile Pairs",
    },
  };
}
