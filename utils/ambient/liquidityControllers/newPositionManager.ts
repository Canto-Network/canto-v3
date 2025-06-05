import { useState } from "react";
import {
  TickRangeKey,
  UserAddConcentratedLiquidityOptions,
  defaultPriceRangeFormatted,
} from "./defaultParams";
import { getDisplayTokenAmountFromRange } from "@/utils/ambient";
import { convertToBigNumber } from "@/utils/formatting";
import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";
import {
  AmbientAddConcentratedLiquidityParams,
  AmbientTxType,
} from "@/transactions/pairs/ambient";
import { priceToTick, encodeCrocPrice } from "@crocswap-libs/sdk/dist/utils/price";
import { 
  liquidityForBaseConc,
  liquidityForQuoteConc,
  roundForConcLiq 
} from "@crocswap-libs/sdk/dist/utils/liquidity";

/**
 * @notice manages the cretion of a new ambient position
 * @dev this is used to calculate the optimal amount of tokens to add based on prices
 * @param pool ambient pool
 * @returns position manager
 */

export function useNewAmbientPositionManager(pool: AmbientPool) {
  /** EXTERNAL STATE WITH USER OPTIONS */
  const initialState = (): UserAddConcentratedLiquidityOptions => {
    const priceRange = defaultPriceRangeFormatted(pool, "DEFAULT");
    return {
      amountBase: "",
      amountQuote: "",
      lastUpdated: "base",
      minRangePrice: priceRange.minPriceFormatted,
      maxRangePrice: priceRange.maxPriceFormatted,
      minExecutionPrice: priceRange.minPriceFormatted,
      maxExecutionPrice: priceRange.maxPriceFormatted,
    };
  };
  const [userInputs, setUserInputs] =
    useState<UserAddConcentratedLiquidityOptions>(initialState());

  /** INTERNAL FUNCTIONS */

  // partial state setter for external state
  function setState(newState: Partial<UserAddConcentratedLiquidityOptions>) {
    setUserInputs((prev) => ({ ...prev, ...newState }));
  }

  // conversions for prices
  function getWeiRangePrices(
    minPriceFormatted: string,
    maxPriceFormatted: string
  ): { minPriceWei: string; maxPriceWei: string } {
    // Convert formatted prices to numbers
    const minPrice = Number(minPriceFormatted);
    const maxPrice = Number(maxPriceFormatted);
    // Get current price and calculate slippage
    const currentPrice = Number(pool.stats.lastPriceSwap);
    const slippage = 0.5; // 0.5% default slippage
    // Calculate execution prices with slippage
    const minExecPrice = currentPrice * (1 - slippage / 100);
    const maxExecPrice = currentPrice * (1 + slippage / 100);
    // Use the more conservative of range prices and execution prices
    const finalMinPrice = Math.min(minPrice, minExecPrice);
    const finalMaxPrice = Math.max(maxPrice, maxExecPrice);
    // Return prices in their original format (base/quote)
    // The contract will handle conversion to Q64.64 format
    return {
      minPriceWei: finalMinPrice.toString(),
      maxPriceWei: finalMaxPrice.toString(),
    };
  }

  /** USER UPDATE FUNCTIONS */

  // function to set range to one of the default options
  function setDefaultParams(range: TickRangeKey) {
    // make sure custom is not selected
    if (range === "CUSTOM") return;
    const priceRange = defaultPriceRangeFormatted(pool, range);
    setUserRangePrice({
      min: priceRange.minPriceFormatted,
      max: priceRange.maxPriceFormatted,
    });
  }

  // function to set execution price (will not update any other values)
  function setUserExecutionPrice(price: string, isMin: boolean) {
    setState(
      isMin ? { minExecutionPrice: price } : { maxExecutionPrice: price }
    );
  }

  // accepts user input for amount and sets other amount based on price
  function setUserAmount(amount: string, isBase: boolean) {
    // use internal state to fetch prices
    const currentPrices = getWeiRangePrices(
      userInputs.minRangePrice,
      userInputs.maxRangePrice
    );
    const newAmount = getDisplayTokenAmountFromRange(
      amount,
      isBase,
      currentPrices.minPriceWei,
      currentPrices.maxPriceWei,
      pool
    );
    setState({
      amountBase: isBase ? amount : newAmount,
      amountQuote: isBase ? newAmount : amount,
      lastUpdated: isBase ? "base" : "quote",
    });
  }

  // accepts user input for price and sets new amounts from price
  function setUserRangePrice(prices: { min?: string; max?: string }) {
    // get new amount from prices
    const lastUpdateBase = userInputs.lastUpdated === "base";
    const minPrice = prices.min ?? userInputs.minRangePrice;
    const maxPrice = prices.max ?? userInputs.maxRangePrice;
    const newWeiPrices = getWeiRangePrices(minPrice, maxPrice);
    // amount
    const amount = getDisplayTokenAmountFromRange(
      lastUpdateBase ? userInputs.amountBase : userInputs.amountQuote,
      lastUpdateBase,
      newWeiPrices.minPriceWei,
      newWeiPrices.maxPriceWei,
      pool
    );
    // set all new values
    setState({
      amountBase: lastUpdateBase ? userInputs.amountBase : amount,
      amountQuote: lastUpdateBase ? amount : userInputs.amountQuote,
      minRangePrice: minPrice,
      maxRangePrice: maxPrice,
    });
  }

  // uses internal state to create all wei values to pass into add liquidity tx
  function createAddConcLiquidityTxParams(): AmbientAddConcentratedLiquidityParams | null {
    // Early return if no amounts are set
    if (!userInputs.amountBase && !userInputs.amountQuote) {
      return null;
    }

    const rangePrices = getWeiRangePrices(
      userInputs.minRangePrice,
      userInputs.maxRangePrice
    );
    const executionPrices = getWeiRangePrices(
      userInputs.minExecutionPrice,
      userInputs.maxExecutionPrice
    );
    const baseAmount = userInputs.lastUpdated === "base";
    
    // Convert to wei first
    const { data: amountWei, error: amountError } = convertToBigNumber(
      baseAmount ? userInputs.amountBase : userInputs.amountQuote,
      baseAmount ? pool.base.decimals : pool.quote.decimals
    );

    if (amountError || !amountWei) {
      console.error("Error converting amount to wei:", amountError);
      return null;
    }

    // --- SDK Tick Calculation ---
    const minPrice = Number(userInputs.minRangePrice);
    const maxPrice = Number(userInputs.maxRangePrice);
    const tickSpacing = pool.tickSize;
    const currentPrice = Number(pool.stats.lastPriceSwap);

    // Log all input values for debugging
    console.log("Input values:", {
      amountWei: amountWei.toString(),
      minPrice,
      maxPrice,
      currentPrice,
      tickSpacing,
      baseAmount
    });

    // Validate inputs
    if (
      !amountWei ||
      Number(amountWei) === 0 ||
      !isFinite(minPrice) || minPrice <= 0 ||
      !isFinite(maxPrice) || maxPrice <= 0 ||
      !isFinite(currentPrice) || currentPrice <= 0 ||
      minPrice === maxPrice
    ) {
      console.error("Invalid input parameters:", {
        amountWei: amountWei?.toString(),
        minPrice,
        maxPrice,
        currentPrice
      });
      return null;
    }

    // Check if current price is outside the range
    if (baseAmount) {
      if (currentPrice <= minPrice) {
        console.error("Current price below min price:", { currentPrice, minPrice });
        return null;
      }
    } else {
      if (currentPrice >= maxPrice) {
        console.error("Current price above max price:", { currentPrice, maxPrice });
        return null;
      }
    }

    const lowerTick = Math.floor(priceToTick(minPrice) / tickSpacing) * tickSpacing;
    const upperTick = Math.ceil(priceToTick(maxPrice) / tickSpacing) * tickSpacing;

    // Log tick values
    console.log("Tick values:", {
      lowerTick,
      upperTick,
      minPrice,
      maxPrice,
      currentPrice
    });

    // Calculate liquidity using SDK functions
    let liq;
    try {
      // Ensure amountWei is a valid integer string before converting to BigInt
      const amountWeiInt = amountWei.toString();
      if (!/^\d+$/.test(amountWeiInt)) {
        console.error("Invalid wei amount:", amountWeiInt);
        return null;
      }

      // Log values before liquidity calculation
      console.log("Values before liquidity calculation:", {
        currentPrice,
        amountWeiInt,
        lowerTick,
        upperTick
      });

      if (baseAmount) {
        liq = liquidityForBaseConc(
          Number(currentPrice),
          BigInt(amountWeiInt),
          Number(minPrice),
          Number(maxPrice)
        );
      } else {
        liq = liquidityForQuoteConc(
          Number(currentPrice),
          BigInt(amountWeiInt),
          Number(minPrice),
          Number(maxPrice)
        );
      }
      liq = roundForConcLiq(liq);

      // Log liquidity result
      console.log("Liquidity calculation result:", {
        liq: liq.toString(),
        baseAmount
      });
    } catch (error) {
      console.error("Error calculating liquidity:", error);
      return null;
    }

    // Use SDK's price encoding
    const minExecPriceQ64 = encodeCrocPrice(Number(executionPrices.minPriceWei));
    const maxExecPriceQ64 = encodeCrocPrice(Number(executionPrices.maxPriceWei));

    return {
      pool: pool,
      txType: AmbientTxType.ADD_CONC_LIQUIDITY,
      amount: amountWei.toString(),
      isAmountBase: baseAmount,
      upperTick,
      lowerTick,
      minExecPriceWei: minExecPriceQ64.toString(),
      maxExecPriceWei: maxExecPriceQ64.toString(),
    };
  }

  return {
    options: {
      ...userInputs,
    },
    setters: {
      setExecutionPrice: setUserExecutionPrice,
      setAmount: setUserAmount,
      setRangePrice: setUserRangePrice,
      setDefaultParams,
    },
    txParams: {
      addLiquidity: createAddConcLiquidityTxParams,
    },
  };
}
