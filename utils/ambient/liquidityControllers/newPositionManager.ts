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

  /** USER UPDATE FUNCTIONS */

  // function to set range to one of the default options
  function setDefaultParams(range: TickRangeKey) {
    // make sure custom is not selected
    if (range === "CUSTOM") return;
    const priceRange = defaultPriceRangeFormatted(pool, range);
    const newMinPrice = priceRange.minPriceFormatted;
    const newMaxPrice = priceRange.maxPriceFormatted;

    // get new amount from prices
    const lastUpdateBase = userInputs.lastUpdated === "base";
    const amount = getDisplayTokenAmountFromRange(
      lastUpdateBase ? userInputs.amountBase : userInputs.amountQuote,
      lastUpdateBase,
      newMinPrice,
      newMaxPrice,
      pool
    );

    setState({
      amountBase: lastUpdateBase ? userInputs.amountBase : amount,
      amountQuote: lastUpdateBase ? amount : userInputs.amountQuote,
      minRangePrice: newMinPrice,
      maxRangePrice: newMaxPrice,
      minExecutionPrice: newMinPrice,
      maxExecutionPrice: newMaxPrice,
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
    const newAmount = getDisplayTokenAmountFromRange(
      amount,
      isBase,
      userInputs.minRangePrice,
      userInputs.maxRangePrice,
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
    // amount
    const amount = getDisplayTokenAmountFromRange(
      lastUpdateBase ? userInputs.amountBase : userInputs.amountQuote,
      lastUpdateBase,
      minPrice,
      maxPrice,
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

    const baseAmount = userInputs.lastUpdated === "base";

    // Convert to wei first
    const { data: amountWei, error: amountError } = convertToBigNumber(
      baseAmount ? userInputs.amountBase : userInputs.amountQuote,
      baseAmount ? pool.base.decimals : pool.quote.decimals
    );

    if (amountError || !amountWei) {
      return null;
    }

    // --- SDK Tick Calculation ---
    const minPrice = Number(userInputs.minRangePrice);
    const maxPrice = Number(userInputs.maxRangePrice);
    const tickSpacing = pool.tickSize;
    const currentPrice = Number(pool.stats.lastPriceSwap);

    // Validate inputs
    if (
      !amountWei ||
      Number(amountWei) === 0 ||
      !isFinite(minPrice) ||
      minPrice <= 0 ||
      !isFinite(maxPrice) ||
      maxPrice <= 0 ||
      !isFinite(currentPrice) ||
      currentPrice <= 0 ||
      minPrice === maxPrice
    ) {
      return null;
    }

    // Check if current price is outside the range for the selected token
    if (baseAmount) {
      if (currentPrice <= minPrice) {
        return null;
      }
    } else {
      if (currentPrice >= maxPrice) {
        return null;
      }
    }

    const lowerTick =
      Math.floor(priceToTick(minPrice) / tickSpacing) * tickSpacing;
    const upperTick =
      Math.ceil(priceToTick(maxPrice) / tickSpacing) * tickSpacing;

    // Calculate liquidity using SDK functions
    let liq;
    try {
      const amountWeiInt = amountWei.toString();
      if (!/^\d+$/.test(amountWeiInt)) {
        return null;
      }

      if (baseAmount) {
        liq = liquidityForBaseConc(
          currentPrice,
          BigInt(amountWeiInt),
          minPrice,
          maxPrice
        );
      } else {
        liq = liquidityForQuoteConc(
          currentPrice,
          BigInt(amountWeiInt),
          minPrice,
          maxPrice
        );
      }
      liq = roundForConcLiq(liq);
    } catch (error) {
      console.error("Error calculating liquidity:", error);
      return null;
    }

    // Use user-defined execution prices for the limits
    const minExecPrice = Number(userInputs.minExecutionPrice);
    const maxExecPrice = Number(userInputs.maxExecutionPrice);

    if (
      !isFinite(minExecPrice) ||
      !isFinite(maxExecPrice) ||
      minExecPrice >= maxExecPrice
    ) {
      return null;
    }

    const minExecPriceQ64 = encodeCrocPrice(minExecPrice);
    const maxExecPriceQ64 = encodeCrocPrice(maxExecPrice);

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
