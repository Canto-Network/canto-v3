import {
  NEW_ERROR,
  NO_ERROR,
  PromiseWithError,
  ReturnWithError,
} from "@/config/interfaces/errors";
import { BridgeTransactionParams } from "../interfaces/hookParams";
import { Transaction } from "@/config/interfaces/transactions";
import { BridgingMethod } from "../interfaces/bridgeMethods";
import {
  getNetworkInfoFromChainId,
  isCosmosNetwork,
  isEVMNetwork,
} from "@/utils/networks.utils";
import {
  bridgeInGravity,
  validateGBridgeInTxParams,
} from "./methods/gravityBridge";
import {
  bridgeLayerZero,
  validateLayerZeroTxParams,
} from "./methods/layerZero";
import { ibcInKeplr, validateKeplrIBCTxParams } from "./keplr/ibcKeplr";
import { txIBCOut, validateIBCOutTxParams } from "./methods/ibc";
import {
  isERC20Token,
  isIBCToken,
  isOFTToken,
} from "@/utils/tokens/tokens.utils";

/**
 * @notice creates a list of transactions that need to be made for bridging into canto
 * @param {BridgeTransactionParams} params parameters for bridging in
 * @returns {PromiseWithError<Transaction[]>} list of transactions to make or error
 */
export async function bridgeInTx(
  params: BridgeTransactionParams
): PromiseWithError<Transaction[]> {
  // create tx list
  let transactions: ReturnWithError<Transaction[]>;

  // get networks
  const { data: fromNetwork } = getNetworkInfoFromChainId(params.from.chainId);
  const { data: toNetwork } = getNetworkInfoFromChainId(params.to.chainId);

  // check the selected method to figure out how to create tx
  switch (params.method) {
    case BridgingMethod.GRAVITY_BRIDGE:
      // check to make sure EVM network is selected
      if (!isEVMNetwork(fromNetwork)) {
        return NEW_ERROR(
          "bridgeInTx: gravity bridge only works for EVM networks"
        );
      }
      // check to make sure token is an ERC20 token
      if (!isERC20Token(params.token.data)) {
        return NEW_ERROR("bridgeInTx: gravity bridge only works for ERC20");
      }
      transactions = await bridgeInGravity(
        params.from.account,
        params.token.data,
        params.token.amount
      );
      break;
    case BridgingMethod.LAYER_ZERO:
      // check to make sure EVM networks are selected
      if (!(isEVMNetwork(fromNetwork) && isEVMNetwork(toNetwork))) {
        return NEW_ERROR("bridgeInTx: layer zero only works for EVM networks");
      }
      // check to make sure token is an OFT token
      if (!isOFTToken(params.token.data)) {
        return NEW_ERROR("bridgeInTx: layer zero only works for ERC20");
      }
      transactions = await bridgeLayerZero(
        fromNetwork,
        toNetwork,
        params.from.account,
        params.token.data,
        params.token.amount
      );
      break;
    case BridgingMethod.IBC: {
      // check to make sure cosmos network is selected
      if (!isCosmosNetwork(fromNetwork)) {
        return NEW_ERROR("bridgeInTx: IBC only works for Cosmos networks");
      }
      // check to make sure token is an IBC token
      if (!isIBCToken(params.token.data)) {
        return NEW_ERROR("bridgeInTx: IBC only works for IBC tokens");
      }
      transactions = await ibcInKeplr(
        fromNetwork,
        params.from.account,
        params.to.account,
        params.token.data,
        params.token.amount
      );
      break;
    }
    default:
      return NEW_ERROR("bridgeInTx: invalid method: " + params.method);
  }
  if (transactions.error) {
    return NEW_ERROR("bridgeInTx::" + transactions.error);
  }
  return transactions;
}

/**
 * @notice creates a list of transactions that need to be made for bridging out of canto
 * @param {BridgeTransactionParams} params parameters for bridging out
 * @returns {PromiseWithError<Transaction[]>} list of transactions to make or error
 */
export async function bridgeOutTx(
  params: BridgeTransactionParams
): PromiseWithError<Transaction[]> {
  // create tx list
  let transactions: ReturnWithError<Transaction[]>;

  // get networks
  const { data: fromNetwork } = getNetworkInfoFromChainId(params.from.chainId);
  const { data: toNetwork } = getNetworkInfoFromChainId(params.to.chainId);

  // check the selected method to figure out how to create tx
  switch (params.method) {
    case BridgingMethod.GRAVITY_BRIDGE:
      return NEW_ERROR("bridgeOutTx: GBRIDGE not implemented");
    case BridgingMethod.LAYER_ZERO:
      // check to make sure EVM networks are selected
      if (!(isEVMNetwork(fromNetwork) && isEVMNetwork(toNetwork))) {
        return NEW_ERROR("bridgeOutTx: layer zero only works for EVM networks");
      }
      // check to make sure token is an ERC20 token
      if (!isOFTToken(params.token.data)) {
        return NEW_ERROR("bridgeOutTx: layer zero only works for ERC20");
      }
      transactions = await bridgeLayerZero(
        fromNetwork,
        toNetwork,
        params.from.account,
        params.token.data,
        params.token.amount
      );
      break;
    case BridgingMethod.IBC: {
      // check to make sure EVM to Cosmos networks are selected
      if (!(isEVMNetwork(fromNetwork) && isCosmosNetwork(toNetwork))) {
        return NEW_ERROR(
          "bridgeOutTx: IBC only works from canto to cosmos networks"
        );
      }
      // check to make sure token is an IBC token
      if (!isIBCToken(params.token.data)) {
        return NEW_ERROR("bridgeOutTx: IBC only works for IBC tokens");
      }
      transactions = await txIBCOut(
        params.from.account,
        params.to.account,
        toNetwork,
        params.token.data,
        params.token.amount
      );
      break;
    }
    default:
      return NEW_ERROR("bridgeOutTx: invalid method: " + params.method);
  }
  if (transactions.error) {
    return NEW_ERROR("bridgeOutTx::" + transactions.error);
  }
  return transactions;
}

export async function validateBridgeInTxParams(
  params: BridgeTransactionParams
): PromiseWithError<{
  valid: boolean;
  error?: string;
}> {
  // balance will depend on the method used
  switch (params.method) {
    case BridgingMethod.GRAVITY_BRIDGE:
      return validateGBridgeInTxParams(params);
    case BridgingMethod.IBC:
      return validateKeplrIBCTxParams(params);
    case BridgingMethod.LAYER_ZERO:
      return validateLayerZeroTxParams(params);
    default: {
      return NO_ERROR({ valid: false, error: "invalid method" });
    }
  }
}

/**
 * @notice validates the parameters for bridging out
 * @param {BridgeTransactionParams} params parameters for bridging out
 * @returns {PromiseWithError<{valid: boolean, error?: string}>} whether the parameters are valid or not
 */
export async function validateBridgeOutTxParams(
  params: BridgeTransactionParams
): PromiseWithError<{
  valid: boolean;
  error?: string;
}> {
  // balance will depend on the method used
  switch (params.method) {
    case BridgingMethod.GRAVITY_BRIDGE:
      return NEW_ERROR("validateBridgeOutTxParams: GBRIDGE not implemented");
    case BridgingMethod.IBC:
      return validateIBCOutTxParams(params);
    case BridgingMethod.LAYER_ZERO:
      return validateLayerZeroTxParams(params);
    default:
      return NO_ERROR({ valid: false, error: "invalid method" });
  }
}