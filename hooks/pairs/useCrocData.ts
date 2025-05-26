import {
  Abi,
  Address,
  Hex,
  Log,
  PublicClient,
  createPublicClient,
  decodeEventLog,
  getAddress,
  http,
} from "viem";
import { canto } from "viem/chains";
import BigNumber from "bignumber.js";

// viem client
export const publicClient: PublicClient = createPublicClient({
  chain: canto,
  transport: http(
    process.env.NEXT_PUBLIC_CANTO_RPC ?? "https://canto-rpc.ansybl.io"
  ),
});

export interface TokenMeta {
  address: Address;
  symbol: string;
  decimals: number;
  logoURI?: string;
}
import { CROCQUERY, CROCSWAP } from "@/config/consts/addresses";
import { CROCDEX_ABI } from "@/config/abis/crocdex";
import { CROCQUERY_ABI } from "@/config/abis/crocquery";
import { CROC_QUERY_ABI } from "@/config/abis";

export interface CrocPool {
  id: string;
  base: TokenMeta;
  quote: TokenMeta;
  poolIdx: number;
  feeRate: number;
  tickSize: number;
  stable: boolean;
  tvlWei: bigint;
  apr: number;
  symbol: string;
}

export interface CrocUserPosition {
  pool: CrocPool;
  liq: bigint; // sqrt(x·y) liquidity
  valueUsd: number; // off-chain USD valuation (stub = 0)
  pctShare: number; // 0…1
  pendingRewardsWei: bigint;
}

/* ------------------------------------------------------------------ */
/* ---------- 3  helper: fetch a pool’s template specs -------------- */
/* ------------------------------------------------------------------ */

export interface TokenMetaCroc {
  chainId: number;
  address: Address;
  symbol: string;
  decimals: number;
  logoURI: string;
  name?: string;
}

export const TOKENS: Record<Address, TokenMetaCroc> = {
  [getAddress("0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503")]: {
    chainId: 7700,
    address: getAddress("0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503"),
    symbol: "NOTE",
    name: "NOTE Stablecoin",
    decimals: 18,
    logoURI: "/icons/note.svg",
  },

  [getAddress("0x826551890dc65655a0aceca109ab11abdbd7a07b")]: {
    chainId: 7700,
    address: getAddress("0x826551890dc65655a0aceca109ab11abdbd7a07b"),
    symbol: "wCANTO",
    name: "Wrapped CANTO",
    decimals: 18,
    logoURI: "/icons/canto.svg",
  },
};

const POOLS_TO_CHECK = [
  {
    base: "0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503",
    quote: "0x826551890dc65655a0aceca109ab11abdbd7a07b",
    poolIdx: 36000n,
  },
];

const CHUNK = 9_000n; // stay below the node’s 10 000-block window

export async function fetchInitPoolLogs(
  client: PublicClient,
  from: bigint = 0n,
  to?: bigint // ← optional
) {
  /** if caller didn’t pass an upper bound, query it now */
  if (to === undefined) {
    to = await client.getBlockNumber();
  }

  const logs: Log[] = [];
  for (let start = from; start <= to; start += CHUNK + 1n) {
    const end = start + CHUNK > to ? to : start + CHUNK;

    const chunk = await client.getLogs({
      address: CROCSWAP,
      abi: CROCDEX_ABI as Abi,
      eventName: "InitPool",
      fromBlock: `0x${start.toString(16)}`,
      toBlock: `0x${end.toString(16)}`,
    });

    logs.push(...chunk);
  }

  return logs;
}

/* ------------------------------------------------------------------ */
/* ---------- 4  listAllPools()  ------------------------------------ */
/* ------------------------------------------------------------------ */

export async function listAllPools(): Promise<CrocPool[]> {
  const pools: CrocPool[] = [];
  for (const { base, quote, poolIdx } of POOLS_TO_CHECK) {
    const params = await publicClient.readContract({
      address: CROCQUERY,
      abi: CROCQUERY_ABI,
      functionName: "queryPoolParams",
      args: [base as Address, quote as Address, poolIdx],
    });

    console.log("pools param", params);

    if (params.schema_ === 0) continue;

    const baseKey = getAddress(base);
    const quoteKey = getAddress(quote);

    console.log("pools key", baseKey, quoteKey);

    const baseMeta = TOKENS[baseKey];
    const quoteMeta = TOKENS[quoteKey];

    console.log("pools meta", baseMeta, quoteMeta);

    if (!baseMeta || !quoteMeta) {
      console.warn("Missing token meta for", baseKey, quoteKey);
      continue;
    }

    pools.push({
      id: `${base}-${quote}-${poolIdx}`,
      base: baseMeta,
      quote: quoteMeta,
      poolIdx: Number(poolIdx),
      symbol: "WCANTO-NOTE",
      feeRate: Number(params.feeRate_) / 1e6,
      tickSize: Number(params.tickSize_),
      stable: quoteMeta.symbol === "NOTE",
      tvlWei: 0n,
      apr: 0,
    });
  }

  console.log("pools man wtf", pools);
  return pools;
}

/* ------------------------------------------------------------------ */
/* ---------- 5  listUserPositions(user) ---------------------------- */
/* ------------------------------------------------------------------ */

export async function listUserPositions(
  user: Address
): Promise<CrocUserPosition[]> {
  if (!user) return [];

  // CrocQuery.listUserPositions(address)
  // returns (address[] base, address[] quote, uint256[] poolIdx,
  //          uint128[] liq, uint128[] pendingRewards)
  const [bases, quotes, poolIdxs, liqs, rewards] =
    (await publicClient.readContract({
      address: CROCQUERY,
      abi: CROCQUERY_ABI as unknown as Abi,
      functionName: "listUserPositions",
      args: [user],
    })) as readonly [Address[], Address[], bigint[], bigint[], bigint[]];

  const poolsCache = await listAllPools(); // could memoize
  const byId = new Map<string, CrocPool>(poolsCache.map((p) => [p.id, p]));

  const positions: CrocUserPosition[] = [];
  for (let i = 0; i < bases.length; i++) {
    const id = `${getAddress(bases[i])}-${getAddress(quotes[i])}-${
      poolIdxs[i]
    }`;
    const pool = byId.get(id);
    if (!pool) continue;

    positions.push({
      pool,
      liq: liqs[i],
      pendingRewardsWei: rewards[i],
      valueUsd: 0, // call price oracle off-chain if you like
      pctShare: 0, // needs total supply / liq math
    });
  }
  return positions;
}

export async function enrichPool(pool: CrocPool): Promise<any> {
  // 1) pull back the raw sqrtPrice (Q64.64) and the pool params
  const [sqrtPriceRaw, params] = await Promise.all([
    publicClient.readContract({
      address: CROCQUERY,
      abi: CROCQUERY_ABI,
      functionName: "queryPrice",
      args: [pool.base.address, pool.quote.address, pool.poolIdx],
    }),
    publicClient.readContract({
      address: CROCQUERY,
      abi: CROCQUERY_ABI,
      functionName: "queryPoolParams",
      args: [pool.base.address, pool.quote.address, pool.poolIdx],
    }),
  ]);

  const sqrtQ64 = BigInt(sqrtPriceRaw);
  const priceQ64 = (sqrtQ64 * sqrtQ64) >> 64n;
  const originalPrice = Number(priceQ64) / 2 ** 64;
  const invertedPrice = 1 / originalPrice;

  const lastPriceSwap = invertedPrice;

  return {
    ...pool,
    stats: {
      lastPriceSwap,
      feeRate: Number(params.feeRate_) / 1e6,
    },
    totals: {
      apr: { poolApr: "0" },
      noteTvl: "0",
    },
    userPositions: [],
    userRewards: "0",
  } as unknown as any;
}

export function watchDexEvents(onUpdate: () => void) {
  return publicClient.watchContractEvent({
    address: CROCSWAP,
    abi: CROCDEX_ABI as unknown as Abi,
    eventName: [
      "MintAmbient",
      "MintRanged",
      "BurnAmbient",
      "BurnRanged",
      "Swap",
      "WithdrawKnockout",
    ],
    onLogs: () => onUpdate(),
  });
}
export default { listAllPools, listUserPositions, watchDexEvents, enrichPool };
