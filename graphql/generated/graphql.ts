/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: number | string; output: string; }
  BigInt: { input: number | string; output: string; }
  Bytes: { input: string; output: string; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: string; output: string; }
};

export type AccountCTokenFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBorrowIndex?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  accountBorrowIndex_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  accountBorrowIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  account_?: InputMaybe<AccountFilter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accrualBlockNumber?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  accrualBlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AccountCTokenFilter>>>;
  cTokenBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  cTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  cTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  enteredMarket?: InputMaybe<Scalars['Boolean']['input']>;
  enteredMarket_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enteredMarket_not?: InputMaybe<Scalars['Boolean']['input']>;
  enteredMarket_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<MarketFilter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<AccountCTokenFilter>>>;
  storedBorrowBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  storedBorrowBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  storedBorrowBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalUnderlyingBorrowed?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingBorrowed_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingBorrowed_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingRedeemed?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingRedeemed_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRedeemed_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingRepaid?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingRepaid_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingRepaid_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingSupplied?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalUnderlyingSupplied_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalUnderlyingSupplied_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  transactionHashes?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHashes_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHashes_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHashes_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHashes_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHashes_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionTimes?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionTimes_contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionTimes_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionTimes_not?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionTimes_not_contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionTimes_not_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type AccountCTokenOrderBy =
  | 'account'
  | 'accountBorrowIndex'
  | 'account__countLiquidated'
  | 'account__countLiquidator'
  | 'account__hasBorrowed'
  | 'account__id'
  | 'accrualBlockNumber'
  | 'cTokenBalance'
  | 'enteredMarket'
  | 'id'
  | 'market'
  | 'market__accrualBlockNumber'
  | 'market__blockTimestamp'
  | 'market__borrowAPY'
  | 'market__borrowDistributionAPY'
  | 'market__borrowIndex'
  | 'market__borrowRate'
  | 'market__cash'
  | 'market__collateralFactor'
  | 'market__exchangeRate'
  | 'market__id'
  | 'market__interestRateModelAddress'
  | 'market__name'
  | 'market__numberOfBorrowers'
  | 'market__numberOfSuppliers'
  | 'market__reserveFactor'
  | 'market__reserves'
  | 'market__supplyAPY'
  | 'market__supplyDistributionAPY'
  | 'market__supplyRate'
  | 'market__symbol'
  | 'market__totalBorrows'
  | 'market__totalSupply'
  | 'market__underlyingAddress'
  | 'market__underlyingDecimals'
  | 'market__underlyingName'
  | 'market__underlyingPrice'
  | 'market__underlyingPriceUSD'
  | 'market__underlyingSymbol'
  | 'storedBorrowBalance'
  | 'symbol'
  | 'totalUnderlyingBorrowed'
  | 'totalUnderlyingRedeemed'
  | 'totalUnderlyingRepaid'
  | 'totalUnderlyingSupplied'
  | 'transactionHashes'
  | 'transactionTimes';

export type AccountFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  countLiquidated?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_gt?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_gte?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  countLiquidated_lt?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_lte?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_not?: InputMaybe<Scalars['Int']['input']>;
  countLiquidated_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  countLiquidator?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_gt?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_gte?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  countLiquidator_lt?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_lte?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_not?: InputMaybe<Scalars['Int']['input']>;
  countLiquidator_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hasBorrowed?: InputMaybe<Scalars['Boolean']['input']>;
  hasBorrowed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  hasBorrowed_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasBorrowed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  tokens_?: InputMaybe<AccountCTokenFilter>;
};

export type AccountOrderBy =
  | 'countLiquidated'
  | 'countLiquidator'
  | 'hasBorrowed'
  | 'id'
  | 'tokens';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type BlockHeight = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ComptrollerDayDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComptrollerDayDataFilter>>>;
  dailyBorrowTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyBorrowTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyBorrowVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailySupplyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailySupplyVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ComptrollerDayDataFilter>>>;
  totalLiquidityNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type ComptrollerDayDataOrderBy =
  | 'dailyBorrowTxns'
  | 'dailyBorrowVolumeNOTE'
  | 'dailyBorrowVolumeUSD'
  | 'dailySupplyTxns'
  | 'dailySupplyVolumeNOTE'
  | 'dailySupplyVolumeUSD'
  | 'date'
  | 'id'
  | 'totalLiquidityNOTE'
  | 'totalLiquidityUSD';

export type ComptrollerFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComptrollerFilter>>>;
  closeFactor?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_gt?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_gte?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  closeFactor_lt?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_lte?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_not?: InputMaybe<Scalars['BigInt']['input']>;
  closeFactor_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidationIncentive?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationIncentive_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationIncentive_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  maxAssets?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  maxAssets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_not?: InputMaybe<Scalars['BigInt']['input']>;
  maxAssets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ComptrollerFilter>>>;
  priceOracle?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_gt?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_gte?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  priceOracle_lt?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_lte?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_not?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceOracle_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  totalLiquidityNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type ComptrollerOrderBy =
  | 'closeFactor'
  | 'id'
  | 'liquidationIncentive'
  | 'maxAssets'
  | 'priceOracle'
  | 'totalLiquidityNOTE'
  | 'totalLiquidityUSD';

export type MarketDayDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketDayDataFilter>>>;
  dailyBorrowTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyBorrowTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailyBorrowTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyBorrowVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyBorrowVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyBorrowVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailySupplyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailySupplyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailySupplyVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailySupplyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailySupplyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<MarketFilter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketDayDataFilter>>>;
  totalLiquidityNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type MarketDayDataOrderBy =
  | 'dailyBorrowTxns'
  | 'dailyBorrowVolumeNOTE'
  | 'dailyBorrowVolumeUSD'
  | 'dailySupplyTxns'
  | 'dailySupplyVolumeNOTE'
  | 'dailySupplyVolumeUSD'
  | 'date'
  | 'id'
  | 'market'
  | 'market__accrualBlockNumber'
  | 'market__blockTimestamp'
  | 'market__borrowAPY'
  | 'market__borrowDistributionAPY'
  | 'market__borrowIndex'
  | 'market__borrowRate'
  | 'market__cash'
  | 'market__collateralFactor'
  | 'market__exchangeRate'
  | 'market__id'
  | 'market__interestRateModelAddress'
  | 'market__name'
  | 'market__numberOfBorrowers'
  | 'market__numberOfSuppliers'
  | 'market__reserveFactor'
  | 'market__reserves'
  | 'market__supplyAPY'
  | 'market__supplyDistributionAPY'
  | 'market__supplyRate'
  | 'market__symbol'
  | 'market__totalBorrows'
  | 'market__totalSupply'
  | 'market__underlyingAddress'
  | 'market__underlyingDecimals'
  | 'market__underlyingName'
  | 'market__underlyingPrice'
  | 'market__underlyingPriceUSD'
  | 'market__underlyingSymbol'
  | 'totalLiquidityNOTE'
  | 'totalLiquidityUSD';

export type MarketHourDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketHourDataFilter>>>;
  hourStartUnix?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourlyBorrowTxns?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyBorrowTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyBorrowTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyBorrowVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyBorrowVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyBorrowVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyBorrowVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyBorrowVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlySupplyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlySupplyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  hourlySupplyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlySupplyVolumeNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlySupplyVolumeNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlySupplyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlySupplyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlySupplyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<MarketFilter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketHourDataFilter>>>;
  totalLiquidityNOTE?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityNOTE_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityNOTE_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type MarketHourDataOrderBy =
  | 'hourStartUnix'
  | 'hourlyBorrowTxns'
  | 'hourlyBorrowVolumeNOTE'
  | 'hourlyBorrowVolumeUSD'
  | 'hourlySupplyTxns'
  | 'hourlySupplyVolumeNOTE'
  | 'hourlySupplyVolumeUSD'
  | 'id'
  | 'market'
  | 'market__accrualBlockNumber'
  | 'market__blockTimestamp'
  | 'market__borrowAPY'
  | 'market__borrowDistributionAPY'
  | 'market__borrowIndex'
  | 'market__borrowRate'
  | 'market__cash'
  | 'market__collateralFactor'
  | 'market__exchangeRate'
  | 'market__id'
  | 'market__interestRateModelAddress'
  | 'market__name'
  | 'market__numberOfBorrowers'
  | 'market__numberOfSuppliers'
  | 'market__reserveFactor'
  | 'market__reserves'
  | 'market__supplyAPY'
  | 'market__supplyDistributionAPY'
  | 'market__supplyRate'
  | 'market__symbol'
  | 'market__totalBorrows'
  | 'market__totalSupply'
  | 'market__underlyingAddress'
  | 'market__underlyingDecimals'
  | 'market__underlyingName'
  | 'market__underlyingPrice'
  | 'market__underlyingPriceUSD'
  | 'market__underlyingSymbol'
  | 'totalLiquidityNOTE'
  | 'totalLiquidityUSD';

export type MarketFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accrualBlockNumber?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  accrualBlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  accrualBlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  and?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  blockTimestamp?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  borrowAPY?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowAPY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowAPY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowDistributionAPY?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowDistributionAPY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowDistributionAPY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowIndex?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowIndex_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  cash?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  cash_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  cash_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralFactor?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralFactor_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  exchangeRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  exchangeRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  exchangeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  interestRateModelAddress?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  interestRateModelAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  interestRateModelAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  numberOfBorrowers?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfBorrowers_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfBorrowers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfSuppliers?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfSuppliers_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfSuppliers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  reserveFactor?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserveFactor_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserveFactor_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserves?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserves_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserves_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyAPY?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyAPY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyAPY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyDistributionAPY?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyDistributionAPY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyDistributionAPY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalBorrows?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBorrows_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  underlyingAddress?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  underlyingAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  underlyingAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  underlyingDecimals?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_gt?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_gte?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  underlyingDecimals_lt?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_lte?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_not?: InputMaybe<Scalars['Int']['input']>;
  underlyingDecimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  underlyingName?: InputMaybe<Scalars['String']['input']>;
  underlyingName_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingName_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingName_gt?: InputMaybe<Scalars['String']['input']>;
  underlyingName_gte?: InputMaybe<Scalars['String']['input']>;
  underlyingName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingName_lt?: InputMaybe<Scalars['String']['input']>;
  underlyingName_lte?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingName_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  underlyingPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  underlyingPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  underlyingPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  underlyingPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingSymbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type MarketOrderBy =
  | 'accrualBlockNumber'
  | 'blockTimestamp'
  | 'borrowAPY'
  | 'borrowDistributionAPY'
  | 'borrowIndex'
  | 'borrowRate'
  | 'cash'
  | 'collateralFactor'
  | 'exchangeRate'
  | 'id'
  | 'interestRateModelAddress'
  | 'name'
  | 'numberOfBorrowers'
  | 'numberOfSuppliers'
  | 'reserveFactor'
  | 'reserves'
  | 'supplyAPY'
  | 'supplyDistributionAPY'
  | 'supplyRate'
  | 'symbol'
  | 'totalBorrows'
  | 'totalSupply'
  | 'underlyingAddress'
  | 'underlyingDecimals'
  | 'underlyingName'
  | 'underlyingPrice'
  | 'underlyingPriceUSD'
  | 'underlyingSymbol';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type SubgraphErrorPolicy =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type MyPositionsQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type MyPositionsQuery = { accountCTokens: Array<{ id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { name: string }, account: { id: string } }> };

export type PositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsQuery = { accountCTokens: Array<{ id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { name: string }, account: { id: string } }> };


export const MyPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storedBorrowBalance"}},{"kind":"Field","name":{"kind":"Name","value":"cTokenBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}}]}}]}}]} as unknown as DocumentNode<MyPositionsQuery, MyPositionsQueryVariables>;
export const PositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storedBorrowBalance"}},{"kind":"Field","name":{"kind":"Name","value":"cTokenBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}}]}}]}}]} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;
export type AccountKeySpecifier = ('countLiquidated' | 'countLiquidator' | 'hasBorrowed' | 'id' | 'tokens' | AccountKeySpecifier)[];
export type AccountFieldPolicy = {
	countLiquidated?: FieldPolicy<any> | FieldReadFunction<any>,
	countLiquidator?: FieldPolicy<any> | FieldReadFunction<any>,
	hasBorrowed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tokens?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountCTokenKeySpecifier = ('account' | 'accountBorrowIndex' | 'accrualBlockNumber' | 'cTokenBalance' | 'enteredMarket' | 'id' | 'market' | 'storedBorrowBalance' | 'symbol' | 'totalUnderlyingBorrowed' | 'totalUnderlyingRedeemed' | 'totalUnderlyingRepaid' | 'totalUnderlyingSupplied' | 'transactionHashes' | 'transactionTimes' | AccountCTokenKeySpecifier)[];
export type AccountCTokenFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accountBorrowIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	accrualBlockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	cTokenBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	enteredMarket?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	market?: FieldPolicy<any> | FieldReadFunction<any>,
	storedBorrowBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>,
	totalUnderlyingBorrowed?: FieldPolicy<any> | FieldReadFunction<any>,
	totalUnderlyingRedeemed?: FieldPolicy<any> | FieldReadFunction<any>,
	totalUnderlyingRepaid?: FieldPolicy<any> | FieldReadFunction<any>,
	totalUnderlyingSupplied?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionHashes?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionTimes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ComptrollerKeySpecifier = ('closeFactor' | 'id' | 'liquidationIncentive' | 'maxAssets' | 'priceOracle' | 'totalLiquidityNOTE' | 'totalLiquidityUSD' | ComptrollerKeySpecifier)[];
export type ComptrollerFieldPolicy = {
	closeFactor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	liquidationIncentive?: FieldPolicy<any> | FieldReadFunction<any>,
	maxAssets?: FieldPolicy<any> | FieldReadFunction<any>,
	priceOracle?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityUSD?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ComptrollerDayDataKeySpecifier = ('dailyBorrowTxns' | 'dailyBorrowVolumeNOTE' | 'dailyBorrowVolumeUSD' | 'dailySupplyTxns' | 'dailySupplyVolumeNOTE' | 'dailySupplyVolumeUSD' | 'date' | 'id' | 'totalLiquidityNOTE' | 'totalLiquidityUSD' | ComptrollerDayDataKeySpecifier)[];
export type ComptrollerDayDataFieldPolicy = {
	dailyBorrowTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyBorrowVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyBorrowVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityUSD?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MarketKeySpecifier = ('accrualBlockNumber' | 'blockTimestamp' | 'borrowAPY' | 'borrowDistributionAPY' | 'borrowIndex' | 'borrowRate' | 'cash' | 'collateralFactor' | 'exchangeRate' | 'id' | 'interestRateModelAddress' | 'name' | 'numberOfBorrowers' | 'numberOfSuppliers' | 'reserveFactor' | 'reserves' | 'supplyAPY' | 'supplyDistributionAPY' | 'supplyRate' | 'symbol' | 'totalBorrows' | 'totalSupply' | 'underlyingAddress' | 'underlyingDecimals' | 'underlyingName' | 'underlyingPrice' | 'underlyingPriceUSD' | 'underlyingSymbol' | MarketKeySpecifier)[];
export type MarketFieldPolicy = {
	accrualBlockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	blockTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowAPY?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowDistributionAPY?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowRate?: FieldPolicy<any> | FieldReadFunction<any>,
	cash?: FieldPolicy<any> | FieldReadFunction<any>,
	collateralFactor?: FieldPolicy<any> | FieldReadFunction<any>,
	exchangeRate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	interestRateModelAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfBorrowers?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfSuppliers?: FieldPolicy<any> | FieldReadFunction<any>,
	reserveFactor?: FieldPolicy<any> | FieldReadFunction<any>,
	reserves?: FieldPolicy<any> | FieldReadFunction<any>,
	supplyAPY?: FieldPolicy<any> | FieldReadFunction<any>,
	supplyDistributionAPY?: FieldPolicy<any> | FieldReadFunction<any>,
	supplyRate?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>,
	totalBorrows?: FieldPolicy<any> | FieldReadFunction<any>,
	totalSupply?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingDecimals?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingName?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingPriceUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	underlyingSymbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MarketDayDataKeySpecifier = ('dailyBorrowTxns' | 'dailyBorrowVolumeNOTE' | 'dailyBorrowVolumeUSD' | 'dailySupplyTxns' | 'dailySupplyVolumeNOTE' | 'dailySupplyVolumeUSD' | 'date' | 'id' | 'market' | 'totalLiquidityNOTE' | 'totalLiquidityUSD' | MarketDayDataKeySpecifier)[];
export type MarketDayDataFieldPolicy = {
	dailyBorrowTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyBorrowVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyBorrowVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	dailySupplyVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	market?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityUSD?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MarketHourDataKeySpecifier = ('hourStartUnix' | 'hourlyBorrowTxns' | 'hourlyBorrowVolumeNOTE' | 'hourlyBorrowVolumeUSD' | 'hourlySupplyTxns' | 'hourlySupplyVolumeNOTE' | 'hourlySupplyVolumeUSD' | 'id' | 'market' | 'totalLiquidityNOTE' | 'totalLiquidityUSD' | MarketHourDataKeySpecifier)[];
export type MarketHourDataFieldPolicy = {
	hourStartUnix?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlyBorrowTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlyBorrowVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlyBorrowVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlySupplyTxns?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlySupplyVolumeNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	hourlySupplyVolumeUSD?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	market?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityNOTE?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLiquidityUSD?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('_meta' | 'account' | 'accountCToken' | 'accountCTokens' | 'accounts' | 'comptroller' | 'comptrollerDayData' | 'comptrollerDayDatas' | 'comptrollers' | 'market' | 'marketDayData' | 'marketDayDatas' | 'marketHourData' | 'marketHourDatas' | 'markets' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accountCToken?: FieldPolicy<any> | FieldReadFunction<any>,
	accountCTokens?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	comptroller?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollerDayData?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollerDayDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollers?: FieldPolicy<any> | FieldReadFunction<any>,
	market?: FieldPolicy<any> | FieldReadFunction<any>,
	marketDayData?: FieldPolicy<any> | FieldReadFunction<any>,
	marketDayDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	marketHourData?: FieldPolicy<any> | FieldReadFunction<any>,
	marketHourDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	markets?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('_meta' | 'account' | 'accountCToken' | 'accountCTokens' | 'accounts' | 'comptroller' | 'comptrollerDayData' | 'comptrollerDayDatas' | 'comptrollers' | 'market' | 'marketDayData' | 'marketDayDatas' | 'marketHourData' | 'marketHourDatas' | 'markets' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accountCToken?: FieldPolicy<any> | FieldReadFunction<any>,
	accountCTokens?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	comptroller?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollerDayData?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollerDayDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	comptrollers?: FieldPolicy<any> | FieldReadFunction<any>,
	market?: FieldPolicy<any> | FieldReadFunction<any>,
	marketDayData?: FieldPolicy<any> | FieldReadFunction<any>,
	marketDayDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	marketHourData?: FieldPolicy<any> | FieldReadFunction<any>,
	marketHourDatas?: FieldPolicy<any> | FieldReadFunction<any>,
	markets?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Block_KeySpecifier = ('hash' | 'number' | 'timestamp' | _Block_KeySpecifier)[];
export type _Block_FieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	number?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Meta_KeySpecifier = ('block' | 'deployment' | 'hasIndexingErrors' | _Meta_KeySpecifier)[];
export type _Meta_FieldPolicy = {
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	deployment?: FieldPolicy<any> | FieldReadFunction<any>,
	hasIndexingErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	AccountCToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountCTokenKeySpecifier | (() => undefined | AccountCTokenKeySpecifier),
		fields?: AccountCTokenFieldPolicy,
	},
	Comptroller?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ComptrollerKeySpecifier | (() => undefined | ComptrollerKeySpecifier),
		fields?: ComptrollerFieldPolicy,
	},
	ComptrollerDayData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ComptrollerDayDataKeySpecifier | (() => undefined | ComptrollerDayDataKeySpecifier),
		fields?: ComptrollerDayDataFieldPolicy,
	},
	Market?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MarketKeySpecifier | (() => undefined | MarketKeySpecifier),
		fields?: MarketFieldPolicy,
	},
	MarketDayData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MarketDayDataKeySpecifier | (() => undefined | MarketDayDataKeySpecifier),
		fields?: MarketDayDataFieldPolicy,
	},
	MarketHourData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MarketHourDataKeySpecifier | (() => undefined | MarketHourDataKeySpecifier),
		fields?: MarketHourDataFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	_Block_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Block_KeySpecifier | (() => undefined | _Block_KeySpecifier),
		fields?: _Block_FieldPolicy,
	},
	_Meta_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Meta_KeySpecifier | (() => undefined | _Meta_KeySpecifier),
		fields?: _Meta_FieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;