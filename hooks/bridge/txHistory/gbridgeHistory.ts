import { GRAVITY_BRIDGE_ABI } from "@/config/abis";
import { GRAVITY_BRIDGE_ETH_ADDRESSES } from "@/config/consts/addresses";
import { GRAVITY_BRIDGE_API_URL } from "@/config/api";
import {
  NEW_ERROR,
  NO_ERROR,
  PromiseWithError,
  errMsg,
} from "@/config/interfaces";
import { tryFetch } from "@/utils/async";
import { newContractInstance } from "@/utils/evm";
import { areEqualAddresses } from "@/utils/address";

export interface UserGBridgeInHistory {
  completed: SendToCosmosEvent[];
  queued: GBridgeQueueReturn[];
}
export async function getUserGBridgeInHistory(
  chainId: number,
  ethAccount: string
): PromiseWithError<UserGBridgeInHistory> {
  const { data: allTransactions, error: eventError } =
    await getUserGBridgeInEvents(chainId, ethAccount);
  if (eventError) {
    return NEW_ERROR("getUserGBridgeInHistory::" + eventError.message);
  }
  const { data: queue, error: queueError } =
    await getGBridgeQueueForUser(ethAccount);
  if (queueError) {
    return NEW_ERROR("getUserGBridgeInHistory::" + queueError.message);
  }
  // there could be matching transactions in the queue and in the event logs
  // split into "completed" and "queued"
  // loop through all events, and separate out the queued transactions
  const completedTxs: SendToCosmosEvent[] = [];
  const queuedTxs: GBridgeQueueReturn[] = [];

  allTransactions.forEach((event) => {
    const matchingQueueTx = queue.transactions.find(
      (qTx) => qTx.block_height === event.blockNumber
    );
    matchingQueueTx
      ? queuedTxs.push(matchingQueueTx)
      : completedTxs.push(event);
  });

  return NO_ERROR({
    completed: completedTxs,
    queued: queuedTxs,
  });
}

interface SendToCosmosEvent {
  chainId: number;
  sender: string;
  destination: string;
  tokenContract: string;
  amount: string;
  txHash: string;
  blockNumber: string;
}

// searches the gravity bridge contract for events that match the eth address sender
async function getUserGBridgeInEvents(
  chainId: number,
  ethAddress: string
): PromiseWithError<SendToCosmosEvent[]> {
  // create contract instance
  const { data: gBridgeContract, error } = newContractInstance<
    typeof GRAVITY_BRIDGE_ABI
  >(chainId, GRAVITY_BRIDGE_ETH_ADDRESSES.gravityBridge, GRAVITY_BRIDGE_ABI);
  if (error) return NEW_ERROR("getUserGBridgeInEvents::" + errMsg(error));
  try {
    // filter by eth sender
    const events = await gBridgeContract.getPastEvents("SendToCosmosEvent", {
      filter: { _sender: ethAddress },
      fromBlock: "0",
      toBlock: "latest",
    });
    // format events to readable format
    const formattedEvents: SendToCosmosEvent[] = [];
    events.forEach((event) => {
      if (typeof event !== "string")
        formattedEvents.push({
          chainId: chainId,
          sender: event.returnValues._sender as string,
          destination: event.returnValues._destination as string,
          tokenContract: event.returnValues._tokenContract as string,
          amount: (event.returnValues._amount as number).toString(),
          txHash: event.transactionHash as string,
          blockNumber: (event.blockNumber as number).toString(),
        });
    });
    return NO_ERROR(formattedEvents);
  } catch (err) {
    return NEW_ERROR("getUserGBridgeInEvents::" + errMsg(err));
  }
}

interface GBridgeQueueReturn {
  amount: string;
  block_height: string;
  blocks_until_confirmed: string;
  confirmed: boolean;
  destination: string;
  erc20: string;
  event_nonce: number;
  seconds_until_confirmed: string;
  sender: string;
}

// this data comes from the gravity bridge api
export async function getGBridgeQueueForUser(
  ethAccount: string
): PromiseWithError<{
  latestBlock: string;
  transactions: GBridgeQueueReturn[];
}> {
  // query gbridge deposit events for queue
  const { data: latestTransactions, error: fetchError } = await tryFetch<{
    latest_eth_block: string;
    deposit_events: GBridgeQueueReturn[];
  }>(GRAVITY_BRIDGE_API_URL + "/eth_bridge_info");
  if (fetchError) {
    return NEW_ERROR("getGBridgeQueueForUser::" + fetchError.message);
  }
  return NO_ERROR({
    latestBlock: latestTransactions.latest_eth_block,
    transactions: latestTransactions.deposit_events.filter((event) =>
      areEqualAddresses(event.sender, ethAccount)
    ),
  });
}
