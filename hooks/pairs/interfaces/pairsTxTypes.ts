import { CTokenWithUserData } from "@/hooks/lending/interfaces/tokens";
import { PairWithUserCTokenData } from "./pairs";

export enum PairsTxTypes {
  ADD_LIQUIDITY = "Add Liquidity",
  STAKE = "Stake",
  REMOVE_LIQUIDITY = "Remove Liquidity",
  UNSTAKE = "Unstake",
}

export type PairsTransactionParams = {
  chainId: number;
  ethAccount: string;
  pair: PairWithUserCTokenData;
  slippage: number;
  deadline: string;
} & (
  | {
      txType: PairsTxTypes.STAKE | PairsTxTypes.UNSTAKE;
      amountLP: string;
    }
  | {
      txType: PairsTxTypes.REMOVE_LIQUIDITY;
      amountLP: string;
      unstake: boolean;
    }
  | {
      txType: PairsTxTypes.ADD_LIQUIDITY;
      amounts: AddLiquidityTxAmounts;
      stake: boolean;
    }
);

export interface StakeLPParams {
  chainId: number,
  ethAccount: string,
  cLPToken: CTokenWithUserData,
  stake: boolean,
  amount?: string
}

interface AddLiquidityTxAmounts {
  amount1: string;
  amount2: string;
}