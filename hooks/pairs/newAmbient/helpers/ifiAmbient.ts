import { Address, PublicClient } from "viem";
import { CROCQUERY_ABI } from "@/config/abis/crocquery";
import { CROCQUERY } from "@/config/consts/addresses";
import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";

const TICK_BASE = 1.0001;

function tickToPriceQuotePerBase(tick: number): number {
  return Math.pow(TICK_BASE, tick);
}

async function fetchLiquidityForTickRange(
  client: PublicClient,
  poolAddressInfo: {
    baseAddress: Address;
    quoteAddress: Address;
    poolIdx: bigint;
  },
  minTickToQuery: number,
  maxTickToQuery: number,
  tickStep: number = 1
): Promise<{ x: number; y: number }[]> {
  const { baseAddress, quoteAddress, poolIdx } = poolAddressInfo;
  const points: { x: number; y: number }[] = [];

  if (minTickToQuery > maxTickToQuery) {
    console.warn(
      "DEBUG fetchLiquidityForTickRange: minTickToQuery is greater than maxTickToQuery. No loop will run."
    );
    return points; // Empty points
  }

  const promises = [];
  for (let tick = minTickToQuery; tick <= maxTickToQuery; tick += tickStep) {
    promises.push(
      client
        .readContract({
          address: CROCQUERY,
          abi: CROCQUERY_ABI,
          functionName: "queryLevel",
          args: [baseAddress, quoteAddress, poolIdx, tick],
        })
        .then((levelData) => {
          // Vital debug logs
          console.log(
            `DEBUG: For tick ${tick} (pool ${poolIdx.toString()}), received levelData:`,
            levelData
          );
          try {
            console.log(
              `DEBUG: For tick ${tick}, stringified levelData:`,
              JSON.stringify(
                levelData,
                (key, value) =>
                  typeof value === "bigint" ? value.toString() + "n" : value // Suffix BigInts with 'n'
              )
            );
          } catch (e) {
            console.error(
              `DEBUG: Error stringifying levelData for tick ${tick}:`,
              e
            );
          }

          let bidLotsVal, askLotsVal;

          if (typeof levelData === "object" && levelData !== null) {
            bidLotsVal = levelData.bidLots;
            askLotsVal = levelData.askLots;
          } else if (Array.isArray(levelData) && levelData.length >= 2) {
            console.warn(
              `DEBUG: For tick ${tick}, levelData was an array. Accessing by index [0] and [1].`
            );
            bidLotsVal = levelData[0];
            askLotsVal = levelData[1];
          } else {
            console.error(
              `DEBUG: For tick ${tick}, levelData is not a recognized object or array. Data:`,
              levelData
            );
            return {
              tick,
              bidLots: 0n,
              askLots: 0n,
              error: "Malformed levelData",
            };
          }

          if (bidLotsVal === undefined) {
            // console.warn(`DEBUG: For tick ${tick}, bidLotsVal was undefined. Defaulting to 0n.`);
            bidLotsVal = 0n; // Default to BigInt zero
          }
          if (askLotsVal === undefined) {
            // console.warn(`DEBUG: For tick ${tick}, askLotsVal was undefined. Defaulting to 0n.`);
            askLotsVal = 0n; // Default to BigInt zero
          }
          // ** MODIFICATION END **

          try {
            const finalBidLots = BigInt(bidLotsVal);
            const finalAskLots = BigInt(askLotsVal);

            return {
              tick,
              bidLots: finalBidLots,
              askLots: finalAskLots,
            };
          } catch (conversionError) {
            console.error(
              `DEBUG: For tick ${tick}, failed to convert lots to BigInt AFTER defaulting. Original bidLotsVal: ${String(
                bidLotsVal
              )}, Original askLotsVal: ${String(askLotsVal)}. Error:`,
              conversionError
            );
            return {
              tick,
              bidLots: 0n,
              askLots: 0n,
              error: "BigInt conversion failed post-default",
            };
          }
        })
        .catch((err) => {
          console.warn(
            `DEBUG: Error during readContract or .then() for tick ${tick} on pool ${poolIdx.toString()}:`,
            err.message || err
          );
          return { tick, bidLots: 0n, askLots: 0n, error: "Promise rejection" };
        })
    );
  }

  if (promises.length === 0) {
    console.warn(
      "DEBUG: No promises were generated. Loop for ticks didn't run or range was empty."
    );
    return points;
  }

  const results = await Promise.all(promises);

  for (const result of results) {
    if (!result || result.error) {
      console.warn(
        `DEBUG: Skipping result for tick ${result?.tick} due to error: ${
          result?.error || "Unknown error during processing"
        }`
      );
      continue;
    }

    const { tick, bidLots, askLots } = result;

    const priceQuotePerBase = tickToPriceQuotePerBase(tick);
    if (priceQuotePerBase === 0 || !isFinite(priceQuotePerBase)) {
      console.warn(
        `DEBUG: priceQuotePerBase is 0 or not finite for tick ${tick} (${priceQuotePerBase}). Skipping.`
      );
      continue;
    }
    const priceBasePerQuote = 1 / priceQuotePerBase;
    // Ensure bidLots and askLots are numbers for summation, or use BigInt arithmetic if they remain BigInts
    const liquidityMagnitude = Number(bidLots) + Number(askLots);

    if (isFinite(priceBasePerQuote) && isFinite(liquidityMagnitude)) {
      points.push({ x: priceBasePerQuote, y: liquidityMagnitude });
    } else {
      console.warn(
        `DEBUG: Skipping point for tick ${tick} due to non-finite priceBasePerQuote (${priceBasePerQuote}) or liquidityMagnitude (${liquidityMagnitude}).`
      );
    }
  }

  if (points.length > 0) {
    // console.log("DEBUG: Sample point:", points[0]);
  }
  return points.sort((a, b) => a.x - b.x);
}

export async function fetchContractLiquidityCurve(
  client: PublicClient,
  pool: Pick<AmbientPool, any> & {
    readonly stats: { lastPriceSwap: number };
  }
): Promise<{ x: number; y: number }[]> {
  if (
    !client ||
    !pool ||
    !pool.stats ||
    typeof pool.stats.lastPriceSwap !== "number"
  ) {
    console.warn(
      "DEBUG fetchContractLiquidityCurve: Client or essential pool data (including stats.lastPriceSwap) is insufficient or invalid. Exiting."
    );
    return [];
  }

  const { base, quote, poolIdx, stats } = pool;
  // Use pool.tickSize; ensure it's a positive integer. Default to 1 if problematic.
  const tickSize =
    typeof pool.tickSize === "number" && pool.tickSize > 0 ? pool.tickSize : 1;

  let currentTickQuoteBase: number;
  try {
    const curveTickResult = await client.readContract({
      address: CROCQUERY,
      abi: CROCQUERY_ABI,
      functionName: "queryCurveTick",
      args: [base.address, quote.address, BigInt(poolIdx)],
    });
    currentTickQuoteBase = Number(curveTickResult);
  } catch (err) {
    console.error(
      "DEBUG fetchContractLiquidityCurve: Failed to fetch current curve tick for graph:",
      err
    );
    return [];
  }

  const currentPriceBaseQuote = stats.lastPriceSwap;
  if (currentPriceBaseQuote === 0 || !isFinite(currentPriceBaseQuote)) {
    console.warn(
      `DEBUG fetchContractLiquidityCurve: currentPriceBaseQuote (pool.stats.lastPriceSwap) is 0 or not finite (${currentPriceBaseQuote}). Cannot reliably calculate tick range. Exiting.`
    );
    return [];
  }
  const currentPriceQuoteBase = 1 / currentPriceBaseQuote;

  if (!isFinite(currentPriceQuoteBase) || currentPriceQuoteBase <= 0) {
    console.warn(
      `DEBUG fetchContractLiquidityCurve: currentPriceQuoteBase is not positive or finite (${currentPriceQuoteBase}). Cannot calculate log. Exiting.`
    );
    return [];
  }

  const priceRangeFactorLow = 0.95;
  const priceRangeFactorHigh = 1.05;

  const minPriceQuoteBaseTarget = currentPriceQuoteBase * priceRangeFactorLow;
  const maxPriceQuoteBaseTarget = currentPriceQuoteBase * priceRangeFactorHigh;

  // Ensure target prices are positive for Math.log
  if (minPriceQuoteBaseTarget <= 0 || maxPriceQuoteBaseTarget <= 0) {
    console.warn(
      "DEBUG fetchContractLiquidityCurve: Target prices for log are not positive. Exiting.",
      { minPriceQuoteBaseTarget, maxPriceQuoteBaseTarget }
    );
    return [];
  }

  const minTickTarget = Math.floor(
    Math.log(minPriceQuoteBaseTarget) / Math.log(TICK_BASE)
  );
  const maxTickTarget = Math.ceil(
    Math.log(maxPriceQuoteBaseTarget) / Math.log(TICK_BASE)
  );
  console.log(
    "DEBUG fetchContractLiquidityCurve: minTickTarget =",
    minTickTarget,
    "maxTickTarget =",
    maxTickTarget,
    "pool.tickSize =",
    tickSize
  );

  const alignedMinTick = Math.floor(minTickTarget / tickSize) * tickSize;
  const alignedMaxTick = Math.ceil(maxTickTarget / tickSize) * tickSize;
  console.log(
    "DEBUG fetchContractLiquidityCurve: alignedMinTick =",
    alignedMinTick,
    "alignedMaxTick =",
    alignedMaxTick
  );

  const MAX_TOTAL_TICKS_TO_QUERY = 200; // Max total ticks in the range to query
  const desiredHalfTickWidth = Math.floor(MAX_TOTAL_TICKS_TO_QUERY / 2);
  const halfScanRangeInPoolTicks =
    Math.floor(desiredHalfTickWidth / tickSize) * tickSize; // Ensure multiple of tickSize
  console.log(
    "DEBUG fetchContractLiquidityCurve: halfScanRangeInPoolTicks =",
    halfScanRangeInPoolTicks
  );

  // Prioritize calculated range around current tick, but cap it
  let finalMinTick = Math.max(
    alignedMinTick,
    currentTickQuoteBase - halfScanRangeInPoolTicks
  );
  let finalMaxTick = Math.min(
    alignedMaxTick,
    currentTickQuoteBase + halfScanRangeInPoolTicks
  );
  console.log(
    "DEBUG fetchContractLiquidityCurve: initial finalMinTick =",
    finalMinTick,
    "initial finalMaxTick =",
    finalMaxTick
  );

  if (finalMinTick >= finalMaxTick) {
    console.warn(
      "DEBUG fetchContractLiquidityCurve: Calculated tick range is invalid or too narrow. Using fallback range around current tick.",
      { finalMinTick, finalMaxTick, currentTickQuoteBase }
    );
    finalMinTick = currentTickQuoteBase - 50 * tickSize; // Fallback: 50 pool ticks on each side
    finalMaxTick = currentTickQuoteBase + 50 * tickSize;
    console.log(
      "DEBUG fetchContractLiquidityCurve: Using Fallback Range - Min:",
      finalMinTick,
      "Max:",
      finalMaxTick
    );
  }

  return fetchLiquidityForTickRange(
    client,
    {
      baseAddress: base.address,
      quoteAddress: quote.address,
      poolIdx: BigInt(poolIdx),
    },
    finalMinTick,
    finalMaxTick,
    tickSize
  );
}
