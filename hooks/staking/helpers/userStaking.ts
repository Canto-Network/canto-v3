import {
  NEW_ERROR,
  NO_ERROR,
  PromiseWithError,
  ReturnWithError,
  errMsg,
} from "@/config/interfaces";
import { UserStakingReturn, DelegationResponse, UnbondingDelegationResponse, DelegationRewardResponse } from "../interfaces/validators";
import { ethToCantoAddress } from "@/utils/address";
import { tryFetch } from "@/utils/async";
import * as NETWORKS from "@/config/networks";

const cantoMainnetUserAPIEndpoint =
  process.env.NEXT_PUBLIC_CANTO_MAINNET_USER_API_URL;
const cantoTestnetUserAPIEndpoint =
  process.env.NEXT_PUBLIC_CANTO_TESTNET_USER_API_URL;

const cantoMainnetCosmosRpcEndpoint =
  process.env.NEXT_PUBLIC_CANTO_MAINNET_COSMOS_RPC_URL;
const cantoTestnetCosmosRpcEndpoint =
  process.env.NEXT_PUBLIC_CANTO_TESTNET_COSMOS_RPC_URL;

function getCosmosRpcEndpoint(chainId: number | string) {
  if (typeof chainId === "number") {
    // if number is passed in, it must be one of the Canto EVM chains
    switch (chainId) {
      case NETWORKS.CANTO_MAINNET_EVM.chainId:
        return NO_ERROR(cantoMainnetCosmosRpcEndpoint);
      case NETWORKS.CANTO_TESTNET_EVM.chainId:
        return NO_ERROR(cantoTestnetCosmosRpcEndpoint);
      default:
        return NEW_ERROR(
          "getCosmosRpcEndpoint",
          "Invalid chainId: " + chainId
        );
    }
  } else {
    return NEW_ERROR(
      "getCosmosRpcEndpoint",
      "Network not found: " + chainId
    );
  }
}

function getUserAPIEndPoint(chainId: number | string) {
  if (typeof chainId === "number") {
    // if number is passed in, it must be one of the Canto EVM chains
    switch (chainId) {
      case NETWORKS.CANTO_MAINNET_EVM.chainId:
        return NO_ERROR(cantoMainnetUserAPIEndpoint);
      case NETWORKS.CANTO_TESTNET_EVM.chainId:
        return NO_ERROR(cantoTestnetUserAPIEndpoint);
      default:
        return NEW_ERROR(
          "getCosmosUserAPIEndpoint",
          "Invalid chainId: " + chainId
        );
    }
  } else {
    return NEW_ERROR(
      "getCosmosUserAPIEndpoint",
      "Network not found: " + chainId
    );
  }
}

const endpointUserStaking = (chainId: number, cantoAddress: string): string => {
  // get cosmos endpoint
  const { data: endpoint, error } = getUserAPIEndPoint(chainId);
  if (error) throw error;
  // get suffix based on endpoint type
  const suffix = "/v1/user/native/" + cantoAddress;
  // return endpoint with suffix
  return endpoint + suffix;
};

async function getCosmosDelegations(chainId: number, cantoAddress: string): PromiseWithError<DelegationResponse[]> {
  // get endpoint
  const { data: endpoint, error } = getCosmosRpcEndpoint(chainId);
  if (error) return NEW_ERROR("getCosmosDelegations", error);
  const suffix = "/cosmos/staking/v1beta1/delegations/" + cantoAddress;
  interface Response {
    delegation_responses: DelegationResponse[];
    pagination: {
      next_key: string;
    };
  }
  let delegations: DelegationResponse[] = [];
  let response = await tryFetch<Response>(endpoint + suffix);
  if (response.error) return NEW_ERROR("getCosmosDelegations", response.error);
  delegations.push(...response.data.delegation_responses);
  // if data.pagination.next_key is not null, there are more delegations while loop
  while (response.data.pagination.next_key !== null) {
    const next_page = await tryFetch<Response>(endpoint + suffix + "?pagination.key=" + response.data.pagination.next_key);
    if (next_page.error) return NEW_ERROR("getCosmosDelegations", next_page.error);
    delegations.push(...next_page.data.delegation_responses);
    response = next_page;
  }
  return NO_ERROR(delegations);
}

async function getCosmosUnbondingDelegations(chainId: number, cantoAddress: string): PromiseWithError<UnbondingDelegationResponse[]> {
  // get endpoint
  const { data: endpoint, error } = getCosmosRpcEndpoint(chainId);
  if (error) return NEW_ERROR("getCosmosUnbondingDelegations", error);
  interface Response {
    unbonding_responses: UnbondingDelegationResponse[];
    pagination: {
      next_key: string;
    };
  }
  const suffix = "/cosmos/staking/v1beta1/delegators/" + cantoAddress + "/unbonding_delegations";
  let response = await tryFetch<Response>(endpoint + suffix);
  if (response.error) return NEW_ERROR("getCosmosUnbondingDelegations", response.error);
  let unbondingDelegations: UnbondingDelegationResponse[] = [];
  unbondingDelegations.push(...response.data.unbonding_responses);
  // if data.pagination.next_key is not null, there are more unbonding delegations while loop
  while (response.data.pagination.next_key !== null) {
    const next_page = await tryFetch<Response>(endpoint + suffix + "?pagination.key=" + response.data.pagination.next_key);
    if (next_page.error) return NEW_ERROR("getCosmosUnbondingDelegations", next_page.error);
    unbondingDelegations.push(...next_page.data.unbonding_responses);
    response = next_page;
  }
  return NO_ERROR(unbondingDelegations);
}

async function getCosmosRewards(chainId: number, cantoAddress: string): PromiseWithError<DelegationRewardResponse> {
  // get endpoint
  const { data: endpoint, error } = getCosmosRpcEndpoint(chainId);
  if (error) return NEW_ERROR("getCosmosRewards", error);

  const suffix = "/cosmos/distribution/v1beta1/delegators/" + cantoAddress + "/rewards";
  const response = await tryFetch<DelegationRewardResponse>(endpoint + suffix);
  if (response.error) return NEW_ERROR("getCosmosRewards", response.error);
  return NO_ERROR(response.data);
}

export async function getAllUserStakingData(
  chainId: number,
  userEthAddress: string | undefined
): PromiseWithError<UserStakingReturn> {
  // wrap entire call into try/catch for error handling
  try {
    // convert to canto address
    if (!userEthAddress)
      return NO_ERROR({
        delegations: [],
        unbondingDelegations: [],
        rewards: {
          rewards: [],
          total: [],
        },
      });
    const { data: cantoAddress, error: cantoAddressError } =
      await ethToCantoAddress(userEthAddress);
    if (cantoAddressError) throw cantoAddressError;

    // uncomment for testing
    // const cantoAddress = "canto1fjfnhpthzxs6x8w4sme2ragqpgyjadannsjej6";
    
    // delegations
    const { data: delegations, error: delegationsError } = await getCosmosDelegations(chainId, cantoAddress);
    if (delegationsError) throw delegationsError;

    // unbonding delegations
    const { data: unbondingDelegations, error: unbondingDelegationsError } = await getCosmosUnbondingDelegations(chainId, cantoAddress);
    if (unbondingDelegationsError) throw unbondingDelegationsError;
    // rewards
    const { data: rewards, error: rewardsError } = await getCosmosRewards(chainId, cantoAddress);
    if (rewardsError) throw rewardsError;

    // return data
    const userStakingData: UserStakingReturn = {
      delegations: delegations,
      unbondingDelegations: unbondingDelegations,
      rewards: rewards,
    }

    return NO_ERROR(userStakingData);
  } catch (err) {
    return NEW_ERROR("getAllUserStakingData::" + errMsg(err));
  }
}
