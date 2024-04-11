import { Fee } from "@/transactions/interfaces";

export const CONVERT_FEE: Fee = {
  amount: "2300000000000000000",
  denom: "acanto",
  gas: "2300000",
};

export const IBC_FEE: Fee = {
  amount: "3000000000000000000",
  denom: "acanto",
  gas: "3000000",
};

export const PUB_KEY_FEE: Fee = {
  amount: "250000000000000000",
  denom: "acanto",
  gas: "250000",
};

export const DELEGATE_FEE: Fee = {
  amount: "20000000000000000",
  denom: "acanto",
  gas: "300000",
};

export const UNDELEGATE_FEE: Fee = {
  amount: "35000000000000000",
  denom: "acanto",
  gas: "500000",
};

export const REDELEGATE_FEE: Fee = {
  amount: "70000000000000000",
  denom: "acanto",
  gas: "1000000",
};
export const CLAIM_STAKING_REWARD_FEE: Fee = {
  amount: "200000000000000000",
  denom: "acanto",
  gas: "3000000",
};
export const VOTING_FEE: Fee = {
  amount: "100000000000000000",
  denom: "acanto",
  gas: "1000000",
};
