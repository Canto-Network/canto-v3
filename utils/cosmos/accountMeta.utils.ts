import { NEW_ERROR, NO_ERROR, PromiseWithError } from "@/config/interfaces";
import { GRAVITY_BRIDGE } from "@/config/networks";
import { Sender } from "@/transactions/interfaces";
import { tryFetch, tryFetchWithRetry } from "@/utils/async";
import { getCantoCosmosNetwork } from "@/utils/networks";

interface CantoAccountReturn {
  account: {
    base_account: {
      account_number: number;
      sequence: number;
      address: string;
      pub_key: {
        key: string;
      } | null;
    };
  };
}
export async function getCantoAccountMetaData(
  cantoAddress: string,
  chainId: string | number
): PromiseWithError<CantoAccountReturn> {
  try {
    // get canto network from chainId
    const cantoNetwork = getCantoCosmosNetwork(chainId);
    if (!cantoNetwork) throw new Error("not canto chain id");

    // get account data
    const { data, error } =
    await tryFetchWithRetry<CantoAccountReturn>(
      `${cantoNetwork.restEndpoint}/cosmos/auth/v1beta1/accounts/${cantoAddress}`,
      2
    );
    if (error) throw error;

    // return account data
    return NO_ERROR(data);
  } catch (err) {
    return NEW_ERROR("getCantoAccountMetaData", err);
  }
}

/**
 * @notice gets sender object for canto EIP txs
 * @param {string} senderCantoAddress sender of tx
 * @param {string | number} chainId chainId for tx
 * @returns {PromiseWithError<Sender>} Sender object or error
 */
export async function getCantoSenderObj(
  senderCantoAddress: string,
  chainId: string | number
): PromiseWithError<Sender> {
  try {
    const { data: cantoAccount, error } = await getCantoAccountMetaData(
      senderCantoAddress,
      chainId
    );
    if (error) throw error;
    const baseAccount = cantoAccount.account.base_account;
    return NO_ERROR({
      accountAddress: baseAccount.address,
      sequence: baseAccount.sequence,
      accountNumber: baseAccount.account_number,
      pubkey: baseAccount.pub_key?.key,
    });
  } catch (err) {
    return NEW_ERROR("getCantoSenderObj", err);
  }
}

interface GravityAccountReturn {
  account: {
    account_number: number;
    sequence: number;
    address: string;
    pub_key: {
      key: string;
    } | null;
  };
}
export async function getGravitySenderObj(
  senderGravityAddress: string
): PromiseWithError<Sender> {
  try {
    const { data: gravityAccount, error } =
    await tryFetchWithRetry<GravityAccountReturn>(
      `${GRAVITY_BRIDGE.restEndpoint}/cosmos/auth/v1beta1/accounts/${senderGravityAddress}`,
      5
    );
    if (error) throw error;
    return NO_ERROR({
      accountAddress: gravityAccount.account.address,
      sequence: gravityAccount.account.sequence,
      accountNumber: gravityAccount.account.account_number,
      pubkey: gravityAccount.account.pub_key?.key,
    });
  } catch (err) {
    return NEW_ERROR("getGravitySenderObj", err);
  }
}
