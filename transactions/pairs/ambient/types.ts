import { AmbientPool } from "@/hooks/pairs/newAmbient/interfaces/ambientPools";

export enum AmbientTxType {
  ADD_CONC_LIQUIDITY = "Add concentrated liquidity",
  REMOVE_CONC_LIQUIDITY = "Remove concentrated liquidity",
  ADD_KNOCKOUT_LIQUIDITY = "Add knockout liquidity",
  REMOVE_KNOCKOUT_LIQUIDITY = "Remove knockout liquidity",
}
export type AmbientTransactionParams = {
  chainId: number;
  ethAccount: string;
} & (
  | AmbientAddConcentratedLiquidityParams
  | AmbientRemoveConcentratedLiquidityParams
  | AmbientAddKnockoutLiquidityParams
  | AmbientRemoveKnockoutLiquidityParams
);

type BaseConcLiqParams = {
  txType: AmbientTxType;
  pool: AmbientPool;
  lowerTick: number;
  upperTick: number;
  minExecPriceWei: string;
  maxExecPriceWei: string;
};
export type AmbientAddConcentratedLiquidityParams = BaseConcLiqParams & {
  txType: AmbientTxType.ADD_CONC_LIQUIDITY;
  amount: string;
  isAmountBase: boolean;
  isAdvanced?: boolean;
  positionId?: string;
};
export type AmbientRemoveConcentratedLiquidityParams = BaseConcLiqParams & {
  txType: AmbientTxType.REMOVE_CONC_LIQUIDITY;
  liquidity: string;
  positionId: string;
  expectedBaseAmount?: string;
  expectedQuoteAmount?: string;
};

export type AmbientClaimRewardsTxParams = {
  chainId: number;
  ethAccount: string;
  rewards: {
    estimatedRewards: string; // estimation before distribution of rewards, only used for drip purposes (all rewards will be claimed)
    rewardsLedgerAddress: string;
    poolName: string;
  }[];
};

//Add Knockout liquidity
export type AmbientAddKnockoutLiquidityParams = BaseConcLiqParams & {
  txType: AmbientTxType.ADD_KNOCKOUT_LIQUIDITY;
  amount: string;
  isAmountBase: boolean;
  isAdvanced?: boolean;
  positionId?: string;
};

//Remove Knockout liquidity
export type AmbientRemoveKnockoutLiquidityParams = BaseConcLiqParams & {
  txType: AmbientTxType.REMOVE_KNOCKOUT_LIQUIDITY;
  amount: string;
  isAmountBase: boolean;
  isAdvanced?: boolean;
  positionId?: string;
};


