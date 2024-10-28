import { useState, useEffect } from "react";

interface BorrowBalance {
  borrowBalance: string;
  decimals: string;
  liquidity: string;
}

interface BorrowBalances {
  [key: string]: BorrowBalance;
}

export function useBorrowBalances(positions: Array<{ id: string }>) {
  const [borrowBalances, setBorrowBalances] = useState<BorrowBalances>({});

  useEffect(() => {
    const fetchBorrowBalances = async () => {
      if (positions.length === 0) return;

      const addresses = positions.map((position) => position.id).join(",");

      try {
        const response = await fetch(
          `https://mcu40116n5.execute-api.us-east-1.amazonaws.com/clm/borrowBalance/${addresses}`
        );
        const data = await response.json();

        const balanceMap = data.accountsBorrowInterest.reduce(
          (acc: BorrowBalances, item: any) => {
            acc[item.cTokenAccountAddress] = {
              borrowBalance: item.borrowBalance,
              decimals: item.decimals,
              liquidity: item.liquidity,
            };
            return acc;
          },
          {}
        );

        setBorrowBalances(balanceMap);
      } catch (error) {
        console.error("Error fetching borrow balances:", error);
      }
    };

    fetchBorrowBalances();
  }, [positions]);

  return borrowBalances;
}
