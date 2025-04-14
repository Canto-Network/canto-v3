import { useState, useEffect } from "react";

interface BorrowBalance {
  borrowBalance: string;
  decimals: string;
  liquidity: string;
}
type BorrowBalances = Record<string, BorrowBalance>;

const CHUNK_SIZE = 40;

export function useBorrowBalances(positions: Array<{ id: string }>) {
  const [balances, setBalances] = useState<BorrowBalances>({});

  useEffect(() => {
    if (!positions.length) return;

    const chunks: string[][] = [];
    for (let i = 0; i < positions.length; i += CHUNK_SIZE) {
      chunks.push(positions.slice(i, i + CHUNK_SIZE).map((p) => p.id));
    }

    (async () => {
      try {
        const results: BorrowBalances = {};

        const fetches = chunks.map(async (ids) => {
          const url = `${
            process.env.NEXT_PUBLIC_CLM_API_URL
          }/borrowBalance/${ids.join(",")}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`bad response ${res.status}`);
          const data = await res.json();
          data.accountsBorrowInterest.forEach((item: any) => {
            results[item.cTokenAccountAddress] = {
              borrowBalance: item.borrowBalance,
              decimals: item.decimals,
              liquidity: item.liquidity,
            };
          });
        });

        await Promise.all(fetches);
        setBalances(results);
      } catch (err) {
        console.error("borrow‑balance fetch failed:", err);
      }
    })();
  }, [positions]);

  return balances;
}
