import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";
import { getPriceFromTick, getTickFromPrice } from "..";
import { formatBalance } from "@/utils/formatting";

/**
 * DEFAULT PARAMS FOR ADDING LIQUIDITY
 */
const DEFAULT_CONC_LIQ_TICK_RANGES = {
  DEFAULT: 75,
  NARROW: 60,
  WIDE: 100,
  CUSTOM: 0,
} as const;
// type for the keys
export type TickRangeKey = keyof typeof DEFAULT_CONC_LIQ_TICK_RANGES;
// array for the values
export const ALL_TICK_KEYS = Object.keys(
  DEFAULT_CONC_LIQ_TICK_RANGES
) as Array<TickRangeKey>;

// Options User has to create new position
export interface UserAddConcentratedLiquidityOptions {
  amountBase: string;
  amountQuote: string;
  lastUpdated: "base" | "quote";
  minRangePrice: string;
  maxRangePrice: string;
  minExecutionPrice: string;
  maxExecutionPrice: string;
}

// default price range from pool and tick key
export const defaultPriceRangeFormatted = (
  pool: AmbientPool,
  tickRange: TickRangeKey
) => {
  // get current price
  const midpointPrice = pool.stats.lastPriceSwap;
  const midpointTick = getTickFromPrice(midpointPrice);
  
  console.log(`[Price Range Debug] Pool: ${pool.base.symbol}-${pool.quote.symbol}`);
  console.log(`[Price Range Debug] Current Price: ${midpointPrice}`);
  console.log(`[Price Range Debug] Midpoint Tick: ${midpointTick}`);
  
  // Calculate a reasonable tick range based on the current price
  // For very small prices (< 1e-6), use a smaller range multiplier
  const rangeMultiplier = Number(midpointPrice) < 1e-6 ? 0.1 : 1;
  const adjustedRange = Math.floor(DEFAULT_CONC_LIQ_TICK_RANGES[tickRange] * rangeMultiplier);
  
  console.log(`[Price Range Debug] Range Multiplier: ${rangeMultiplier}`);
  console.log(`[Price Range Debug] Adjusted Range: ${adjustedRange}`);
  
  // lower tick and price
  const lowerTick = midpointTick - adjustedRange;
  const minPrice = getPriceFromTick(lowerTick);
  const minPriceFormatted = formatBalance(
    minPrice,
    pool.base.decimals - pool.quote.decimals,
    { precision: 5 }
  );
  
  // upper tick and price
  const upperTick = midpointTick + adjustedRange;
  const maxPrice = getPriceFromTick(upperTick);
  const maxPriceFormatted = formatBalance(
    maxPrice,
    pool.base.decimals - pool.quote.decimals,
    { precision: 5 }
  );
  
  console.log(`[Price Range Debug] Lower Tick: ${lowerTick}, Price: ${minPrice}`);
  console.log(`[Price Range Debug] Upper Tick: ${upperTick}, Price: ${maxPrice}`);
  
  return {
    minPriceFormatted: minPrice.toString(),
    maxPriceFormatted: maxPrice.toString(),
  };
};
