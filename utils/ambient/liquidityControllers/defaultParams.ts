import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";
import { priceToTick, tickToPrice } from "@crocswap-libs/sdk/dist/utils/price";
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
  const midpointPrice = Number(pool.stats.lastPriceSwap);
  const midpointTick = priceToTick(midpointPrice);

  // Calculate a reasonable tick range based on the current price
  const adjustedRange = DEFAULT_CONC_LIQ_TICK_RANGES[tickRange];

  // lower tick and price using SDK
  const lowerTick = midpointTick - adjustedRange;
  const minPrice = tickToPrice(lowerTick);
  const minPriceFormatted = formatBalance(
    minPrice.toString(),
    pool.base.decimals - pool.quote.decimals,
    { precision: 5 }
  );

  // upper tick and price using SDK
  const upperTick = midpointTick + adjustedRange;
  const maxPrice = tickToPrice(upperTick);
  const maxPriceFormatted = formatBalance(
    maxPrice.toString(),
    pool.base.decimals - pool.quote.decimals,
    { precision: 5 }
  );

  return {
    minPriceFormatted: minPrice.toString(),
    maxPriceFormatted: maxPrice.toString(),
  };
};
