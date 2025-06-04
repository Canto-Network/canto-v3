import BigNumber from "bignumber.js";

///
/// IMPORTANT NOTES:
/// Price = Base / QUOTE (base per quote)
///

const Q64_SCALE = new BigNumber(2).pow(64);
/**
 * @notice converts a Q64 price to a string
 * @dev Will return how much base token is worth in quote token (not scaled)
 * @param {string} q64RootPrice price to convert
 * @returns {string} converted price (wei of base per wei of quote)
 */
function convertFromQ64RootPrice(q64RootPrice: string): string {
  // convert price to big number
  const priceBN = new BigNumber(q64RootPrice);
  // divide price by scale
  const priceScaled = priceBN.div(Q64_SCALE);
  // square price to get final value
  const priceFinal = priceScaled.times(priceScaled);
  // return as string
  return priceFinal.toString();
}

/**
 * @notice converts a string price to a Q64 price
 * @param {string} price price to convert
 * @returns {string} converted price Q64 notation
 */
export function convertToQ64RootPrice(price: string): string {
  // convert price to big number
  const priceBN = new BigNumber(price);
  // take square root of the price
  const priceRoot = priceBN.sqrt();
  // multiply by scale
  const priceScaled = priceRoot.times(Q64_SCALE);
  // return
  return priceScaled.integerValue().toString();
}

/**
 * @notice gets the tick of a price
 * @dev i = log(base1.0001)*P(i)
 * @param price Price in terms of base per quote
 * @param tickSize The tick spacing for the pool (defaults to 1)
 * @returns tick of price, aligned to tickSize
 */
export function getTickFromPrice(price: string, tickSize: number = 1): number {
  // Convert price to a number and ensure it's positive
  const priceNum = Number(price);
  if (priceNum <= 0) {
    console.error("getTickFromPrice: Price must be positive:", price);
    return 0;
  }
  
  // Calculate tick using log base 1.0001
  const tick = Math.log(priceNum) / Math.log(1.0001);
  
  // Ensure tick is within valid range
  const MIN_TICK = -665454;
  const MAX_TICK = 831818;
  const boundedTick = Math.max(MIN_TICK, Math.min(MAX_TICK, tick));
  
  // Align tick to pool's tick size
  const alignedTick = Math.round(boundedTick / tickSize) * tickSize;
  
  return alignedTick;
}

/**
 * @notice gets the price of a tick
 * @param tick tick to get price of
 * @returns price of tick in terms of base per quote
 */
export function getPriceFromTick(tick: number): string {
  // Ensure tick is within valid range
  const MIN_TICK = -665454;
  const MAX_TICK = 831818;
  const boundedTick = Math.max(MIN_TICK, Math.min(MAX_TICK, tick));
  
  // Calculate price using 1.0001^tick
  const price = Math.pow(1.0001, boundedTick);
  
  // Convert to string without scientific notation
  return new BigNumber(price).toString();
}
