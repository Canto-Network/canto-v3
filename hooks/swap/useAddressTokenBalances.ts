import {
  atomAddress,
  cantoAddress,
  ethAddress,
  noteAddress,
  usdcAddress,
  usdtAddress,
  wCantoAddress,
} from "@/config/consts/addresses";
import { CANTO_MAINNET_EVM } from "@/config/networks";
import { useQuery } from "@tanstack/react-query";
import { readContracts } from "@wagmi/core";

export enum TokenType {
  ERC20 = "ERC-20",
  ERC721 = "ERC-721",
  ERC1155 = "ERC-1155",
}

const erc20Slice = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
  },
] as const;

const TOKENS: any = [
  {
    address: wCantoAddress,
    symbol: "WCANTO",
    decimals: 18,
    type: TokenType.ERC20,
  },
  { address: noteAddress, symbol: "NOTE", decimals: 18, type: TokenType.ERC20 },
  { address: usdcAddress, symbol: "USDC", decimals: 6, type: TokenType.ERC20 },
  { address: atomAddress, symbol: "ATOM", decimals: 6, type: TokenType.ERC20 },
  { address: usdtAddress, symbol: "USDT", decimals: 6, type: TokenType.ERC20 },
  { address: ethAddress, symbol: "ETH", decimals: 18, type: TokenType.ERC20 },
];

type TokenBalance = {
  token: any;
  value: bigint;
};

export const useAddressTokenBalancesQuery = (account?: string) => {
  return useQuery<TokenBalance[]>({
    queryKey: ["address-token-balances", account],
    enabled: !!account,
    staleTime: Infinity,
    queryFn: async () => {
      if (!account) {
        return [];
      }

      const contracts = TOKENS.flatMap(
        (t: { address: string; decimals: undefined }) => {
          const calls: any[] = [
            {
              abi: erc20Slice,
              address: t.address as `0x${string}`,
              functionName: "balanceOf",
              args: [account],
              chainId: CANTO_MAINNET_EVM.chainId,
            },
          ];
          if (t.decimals === undefined) {
            calls.push({
              abi: erc20Slice,
              address: t.address as `0x${string}`,
              functionName: "decimals",
            });
          }
          return calls;
        }
      );

      const results = (await readContracts({
        contracts,
        allowFailure: false,
      })) as readonly bigint[];

      let cursor = 0;
      return TOKENS.map((t: { decimals: number | undefined }) => {
        const value = results[cursor++] as bigint;
        if (t.decimals === undefined) {
          t.decimals = Number(results[cursor++] as bigint);
        }
        return { token: t, value };
      });
    },
  });
};
