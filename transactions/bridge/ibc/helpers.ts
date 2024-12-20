import { NEW_ERROR, NO_ERROR, PromiseWithError } from "@/config/interfaces";
import { tryFetchMultipleEndpoints } from "@/utils/async";

interface IBCData {
  height: {
    revision_number: string;
    revision_height: string;
  };
}
/**
 * @param {string} restEndpoint rest endpoint to request counter-party chain timestamp
 * @param {string[]} extraEndpoints extra endpoints to try if first one fails
 * @returns {PromiseWithError<IBCData>} IBCData or error
 */
export async function getIBCData(
  restEndpoint: string,
  extraEndpoints?: string[]
): PromiseWithError<IBCData> {
  const allEndpoints = [restEndpoint, ...(extraEndpoints ?? [])].map(
    (endpoint) => endpoint + "/ibc/core/channel/v1/channels"
  );
  const ibcData = await tryFetchMultipleEndpoints<IBCData>(allEndpoints);
  if (ibcData.error) {
    return NEW_ERROR("getIBCData", ibcData.error);
  }
  return ibcData;
}

/**
 * @param {string} restEndpoint rest endpoint to request counter-party chain timestamp
 * @param {string[]} extraEndpoints extra endpoints to try if first one fails
 * @param {string} latestBlockEndpoint endpoint to get latest block
 * @returns {PromiseWithError<string>} timestamp or error
 */
export async function getBlockTimestamp(
  restEndpoint: string,
  extraEndpoints?: string[],
  latestBlockEndpoint?: string,
  receivingChain?: string
): PromiseWithError<string> {
  // Determine the URL ending based on receivingChain
  const defaultUrlEnding =
    receivingChain === "injective-1" ||
    receivingChain === "cosmoshub-4" ||
    receivingChain === "osmosis-1" ||
    receivingChain === "quicksilver-2" ||
    receivingChain === "sommelier-3" ||
    receivingChain === "stride-1"
      ? "/blocks/latest"
      : "/cosmos/base/tendermint/v1beta1/blocks/latest";

  const urlEnding = latestBlockEndpoint ?? "";

  const allEndpoints = [restEndpoint, ...(extraEndpoints ?? [])].map(
    (endpoint) => endpoint + urlEnding + defaultUrlEnding
  );

  const { data, error } = await tryFetchMultipleEndpoints<{
    block: { header: { time: string } };
  }>(allEndpoints);

  if (error) {
    return NEW_ERROR("getBlockTimestamp" + error);
  }

  try {
    // Get ISO formatted timestamp from the latest block
    const ts = data["block"]["header"]["time"];
    // Parse string into milliseconds UTC
    const ms = Date.parse(ts);
    // Return as nanoseconds
    return NO_ERROR(Number(ms * 1e6 + 600 * 1e9).toString());
  } catch (err) {
    return NEW_ERROR("getBlockTimestamp", err);
  }
}
