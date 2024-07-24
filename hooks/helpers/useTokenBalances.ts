import {
  ERC20Token,
  IBCToken,
  NEW_ERROR,
  PromiseWithError,
  UserTokenBalances,
} from "@/config/interfaces";
import { getEVMTokenBalanceList } from "@/utils/tokens";
import {
  getCosmosTokenBalance,
  getCosmosTokenBalanceList,
} from "@/utils/cosmos";
import { useQuery } from "react-query";
import { getCosmosEIPChainObject } from "@/utils/networks";
import { ethToCantoAddress } from "@/utils/address";
import { addTokenBalances } from "@/utils/math";
import { CANTO_MAINNET_COSMOS, INJECTIVE, AKASH } from "@/config/networks";

/**
 * @notice hook to get an object of token balances for a given address and available tokens
 * @dev will return a mappping of token id => balance
 * @param {number | string | undefined} chainId chainId to get balances for
 * @param {ERC20Token[]} tokens list of tokens to get balances for
 * @param {string | null} userEthAddress eth address to get balances for
 * @param {string | null} userCosmosAddress cosmos address to get balances for
 * @returns {UserTokenBalances} object of token balances
 */
export default function useTokenBalances(
  chainId: number | string | undefined,
  tokens: ERC20Token[],
  userEthAddress: string | null = null,
  userCosmosAddress: string | null = null,
  combinedCantoNative = false
): UserTokenBalances {
  const { data } = useQuery(
    [
      "tokenBalances",
      {
        chainId,
        tokens,
        userEthAddress,
        userCosmosAddress,
      },
    ],
    async (): Promise<UserTokenBalances> => {
      try {
        const { data: balances, error: balancesError } = await getTokenBalances(
          chainId,
          tokens,
          userEthAddress,
          userCosmosAddress
        );
        if (balancesError) throw balancesError;

        // if injective add special canto native balance
        if (chainId === INJECTIVE.chainId) {
          const { data: injCantoBalance, error: injError } =
            await getCosmosTokenBalance(
              CANTO_MAINNET_COSMOS.chainId,
              (await ethToCantoAddress(userEthAddress as string)).data,
              "ibc/4E790C04E6F00F971251E227AEA8E19A5AD274BFE18253EF0EDD7707D8AF1F7C"
            );

          if (injCantoBalance) {
            balances["inj"] = addTokenBalances(
              balances["inj"],
              injCantoBalance
            );
          }
        }

        // if akash add special canto native balance
        if (chainId === AKASH.chainId) {
          const { data: akashCantoBalance, error: akashError } =
            await getCosmosTokenBalance(
              CANTO_MAINNET_COSMOS.chainId,
              (await ethToCantoAddress(userEthAddress as string)).data,
              "ibc/C7B08BE4C7765726030DF899C78DE8FC8DFA6B580920B18AE04A3A70447BE299"
            );
          if (akashCantoBalance) {
            balances["uakt"] = addTokenBalances(
              balances["uakt"] ?? "0",
              akashCantoBalance
            );
          }
        }

        // check if we need to combine native balances (convert coins)
        if (combinedCantoNative && userEthAddress) {
          // if error just return balances
          try {
            // get chain ids for token lookups
            const { data: chainObject, error: chainError } =
              getCosmosEIPChainObject(chainId as number);
            if (chainError) throw chainError;

            // get canto address
            const { data: cantoAddress, error: cantoAddressError } =
              await ethToCantoAddress(userEthAddress);
            if (cantoAddressError) throw cantoAddressError;

            // get native balances
            const { data: nativeBalances, error: nativeError } =
              await getCosmosTokenBalanceList(
                chainObject.cosmosChainId,
                cantoAddress
              );
            if (nativeError) throw nativeError;

            // go through token list to see if any are native compatible, (has ibcDenom)
            for (const token of tokens) {
              const ibcToken = token as IBCToken;
              if (ibcToken.ibcDenom && nativeBalances[ibcToken.ibcDenom]) {
                balances[token.id] = addTokenBalances(
                  balances[token.id],
                  nativeBalances[ibcToken.ibcDenom]
                );
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
        return balances;
      } catch (err) {
        // console.error(err);
        return {};
      }
    },
    {
      onError(error) {
        console.error(error);
      },
      placeholderData: {},
    }
  );
  return data ?? {};
}

async function getTokenBalances(
  chainId: string | number | undefined,
  tokens: ERC20Token[],
  userEthAddress: string | null,
  userCosmosAddress: string | null
): PromiseWithError<UserTokenBalances> {
  // only set balances if there is a user and the chain is an evm chain
  if (typeof chainId === "number" && userEthAddress) {
    return await getEVMTokenBalanceList(chainId, tokens, userEthAddress);
  } else if (typeof chainId === "string" && userCosmosAddress) {
    return await getCosmosTokenBalanceList(chainId, userCosmosAddress);
  }
  return NEW_ERROR("useTokenBalances::getTokenBalances");
}
