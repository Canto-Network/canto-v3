/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export enum AccountCTokenOrderBy {
  ACCOUNT = 'account',
  ACCOUNTBORROWINDEX = 'accountBorrowIndex',
  ACCOUNT__COUNTLIQUIDATED = 'account__countLiquidated',
  ACCOUNT__COUNTLIQUIDATOR = 'account__countLiquidator',
  ACCOUNT__HASBORROWED = 'account__hasBorrowed',
  ACCOUNT__ID = 'account__id',
  ACCRUALBLOCKNUMBER = 'accrualBlockNumber',
  CTOKENBALANCE = 'cTokenBalance',
  ENTEREDMARKET = 'enteredMarket',
  ID = 'id',
  MARKET = 'market',
  MARKET__ACCRUALBLOCKNUMBER = 'market__accrualBlockNumber',
  MARKET__BLOCKTIMESTAMP = 'market__blockTimestamp',
  MARKET__BORROWAPY = 'market__borrowAPY',
  MARKET__BORROWDISTRIBUTIONAPY = 'market__borrowDistributionAPY',
  MARKET__BORROWINDEX = 'market__borrowIndex',
  MARKET__BORROWRATE = 'market__borrowRate',
  MARKET__CASH = 'market__cash',
  MARKET__COLLATERALFACTOR = 'market__collateralFactor',
  MARKET__EXCHANGERATE = 'market__exchangeRate',
  MARKET__ID = 'market__id',
  MARKET__INTERESTRATEMODELADDRESS = 'market__interestRateModelAddress',
  MARKET__NAME = 'market__name',
  MARKET__NUMBEROFBORROWERS = 'market__numberOfBorrowers',
  MARKET__NUMBEROFSUPPLIERS = 'market__numberOfSuppliers',
  MARKET__RESERVEFACTOR = 'market__reserveFactor',
  MARKET__RESERVES = 'market__reserves',
  MARKET__SUPPLYAPY = 'market__supplyAPY',
  MARKET__SUPPLYDISTRIBUTIONAPY = 'market__supplyDistributionAPY',
  MARKET__SUPPLYRATE = 'market__supplyRate',
  MARKET__SYMBOL = 'market__symbol',
  MARKET__TOTALBORROWS = 'market__totalBorrows',
  MARKET__TOTALSUPPLY = 'market__totalSupply',
  MARKET__UNDERLYINGADDRESS = 'market__underlyingAddress',
  MARKET__UNDERLYINGDECIMALS = 'market__underlyingDecimals',
  MARKET__UNDERLYINGNAME = 'market__underlyingName',
  MARKET__UNDERLYINGPRICE = 'market__underlyingPrice',
  MARKET__UNDERLYINGPRICEUSD = 'market__underlyingPriceUSD',
  MARKET__UNDERLYINGSYMBOL = 'market__underlyingSymbol',
  STOREDBORROWBALANCE = 'storedBorrowBalance',
  SYMBOL = 'symbol',
  TOTALUNDERLYINGBORROWED = 'totalUnderlyingBorrowed',
  TOTALUNDERLYINGREDEEMED = 'totalUnderlyingRedeemed',
  TOTALUNDERLYINGREPAID = 'totalUnderlyingRepaid',
  TOTALUNDERLYINGSUPPLIED = 'totalUnderlyingSupplied',
  TRANSACTIONHASHES = 'transactionHashes',
  TRANSACTIONTIMES = 'transactionTimes'
}

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

export enum AccountOrderBy {
  COUNTLIQUIDATED = 'countLiquidated',
  COUNTLIQUIDATOR = 'countLiquidator',
  HASBORROWED = 'hasBorrowed',
  ID = 'id',
  TOKENS = 'tokens'
}

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

export enum ComptrollerDayDataOrderBy {
  DAILYBORROWTXNS = 'dailyBorrowTxns',
  DAILYBORROWVOLUMENOTE = 'dailyBorrowVolumeNOTE',
  DAILYBORROWVOLUMEUSD = 'dailyBorrowVolumeUSD',
  DAILYSUPPLYTXNS = 'dailySupplyTxns',
  DAILYSUPPLYVOLUMENOTE = 'dailySupplyVolumeNOTE',
  DAILYSUPPLYVOLUMEUSD = 'dailySupplyVolumeUSD',
  DATE = 'date',
  ID = 'id',
  TOTALLIQUIDITYNOTE = 'totalLiquidityNOTE',
  TOTALLIQUIDITYUSD = 'totalLiquidityUSD'
}

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

export enum ComptrollerOrderBy {
  CLOSEFACTOR = 'closeFactor',
  ID = 'id',
  LIQUIDATIONINCENTIVE = 'liquidationIncentive',
  MAXASSETS = 'maxAssets',
  PRICEORACLE = 'priceOracle',
  TOTALLIQUIDITYNOTE = 'totalLiquidityNOTE',
  TOTALLIQUIDITYUSD = 'totalLiquidityUSD'
}

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

export enum MarketDayDataOrderBy {
  DAILYBORROWTXNS = 'dailyBorrowTxns',
  DAILYBORROWVOLUMENOTE = 'dailyBorrowVolumeNOTE',
  DAILYBORROWVOLUMEUSD = 'dailyBorrowVolumeUSD',
  DAILYSUPPLYTXNS = 'dailySupplyTxns',
  DAILYSUPPLYVOLUMENOTE = 'dailySupplyVolumeNOTE',
  DAILYSUPPLYVOLUMEUSD = 'dailySupplyVolumeUSD',
  DATE = 'date',
  ID = 'id',
  MARKET = 'market',
  MARKET__ACCRUALBLOCKNUMBER = 'market__accrualBlockNumber',
  MARKET__BLOCKTIMESTAMP = 'market__blockTimestamp',
  MARKET__BORROWAPY = 'market__borrowAPY',
  MARKET__BORROWDISTRIBUTIONAPY = 'market__borrowDistributionAPY',
  MARKET__BORROWINDEX = 'market__borrowIndex',
  MARKET__BORROWRATE = 'market__borrowRate',
  MARKET__CASH = 'market__cash',
  MARKET__COLLATERALFACTOR = 'market__collateralFactor',
  MARKET__EXCHANGERATE = 'market__exchangeRate',
  MARKET__ID = 'market__id',
  MARKET__INTERESTRATEMODELADDRESS = 'market__interestRateModelAddress',
  MARKET__NAME = 'market__name',
  MARKET__NUMBEROFBORROWERS = 'market__numberOfBorrowers',
  MARKET__NUMBEROFSUPPLIERS = 'market__numberOfSuppliers',
  MARKET__RESERVEFACTOR = 'market__reserveFactor',
  MARKET__RESERVES = 'market__reserves',
  MARKET__SUPPLYAPY = 'market__supplyAPY',
  MARKET__SUPPLYDISTRIBUTIONAPY = 'market__supplyDistributionAPY',
  MARKET__SUPPLYRATE = 'market__supplyRate',
  MARKET__SYMBOL = 'market__symbol',
  MARKET__TOTALBORROWS = 'market__totalBorrows',
  MARKET__TOTALSUPPLY = 'market__totalSupply',
  MARKET__UNDERLYINGADDRESS = 'market__underlyingAddress',
  MARKET__UNDERLYINGDECIMALS = 'market__underlyingDecimals',
  MARKET__UNDERLYINGNAME = 'market__underlyingName',
  MARKET__UNDERLYINGPRICE = 'market__underlyingPrice',
  MARKET__UNDERLYINGPRICEUSD = 'market__underlyingPriceUSD',
  MARKET__UNDERLYINGSYMBOL = 'market__underlyingSymbol',
  TOTALLIQUIDITYNOTE = 'totalLiquidityNOTE',
  TOTALLIQUIDITYUSD = 'totalLiquidityUSD'
}

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

export enum MarketHourDataOrderBy {
  HOURSTARTUNIX = 'hourStartUnix',
  HOURLYBORROWTXNS = 'hourlyBorrowTxns',
  HOURLYBORROWVOLUMENOTE = 'hourlyBorrowVolumeNOTE',
  HOURLYBORROWVOLUMEUSD = 'hourlyBorrowVolumeUSD',
  HOURLYSUPPLYTXNS = 'hourlySupplyTxns',
  HOURLYSUPPLYVOLUMENOTE = 'hourlySupplyVolumeNOTE',
  HOURLYSUPPLYVOLUMEUSD = 'hourlySupplyVolumeUSD',
  ID = 'id',
  MARKET = 'market',
  MARKET__ACCRUALBLOCKNUMBER = 'market__accrualBlockNumber',
  MARKET__BLOCKTIMESTAMP = 'market__blockTimestamp',
  MARKET__BORROWAPY = 'market__borrowAPY',
  MARKET__BORROWDISTRIBUTIONAPY = 'market__borrowDistributionAPY',
  MARKET__BORROWINDEX = 'market__borrowIndex',
  MARKET__BORROWRATE = 'market__borrowRate',
  MARKET__CASH = 'market__cash',
  MARKET__COLLATERALFACTOR = 'market__collateralFactor',
  MARKET__EXCHANGERATE = 'market__exchangeRate',
  MARKET__ID = 'market__id',
  MARKET__INTERESTRATEMODELADDRESS = 'market__interestRateModelAddress',
  MARKET__NAME = 'market__name',
  MARKET__NUMBEROFBORROWERS = 'market__numberOfBorrowers',
  MARKET__NUMBEROFSUPPLIERS = 'market__numberOfSuppliers',
  MARKET__RESERVEFACTOR = 'market__reserveFactor',
  MARKET__RESERVES = 'market__reserves',
  MARKET__SUPPLYAPY = 'market__supplyAPY',
  MARKET__SUPPLYDISTRIBUTIONAPY = 'market__supplyDistributionAPY',
  MARKET__SUPPLYRATE = 'market__supplyRate',
  MARKET__SYMBOL = 'market__symbol',
  MARKET__TOTALBORROWS = 'market__totalBorrows',
  MARKET__TOTALSUPPLY = 'market__totalSupply',
  MARKET__UNDERLYINGADDRESS = 'market__underlyingAddress',
  MARKET__UNDERLYINGDECIMALS = 'market__underlyingDecimals',
  MARKET__UNDERLYINGNAME = 'market__underlyingName',
  MARKET__UNDERLYINGPRICE = 'market__underlyingPrice',
  MARKET__UNDERLYINGPRICEUSD = 'market__underlyingPriceUSD',
  MARKET__UNDERLYINGSYMBOL = 'market__underlyingSymbol',
  TOTALLIQUIDITYNOTE = 'totalLiquidityNOTE',
  TOTALLIQUIDITYUSD = 'totalLiquidityUSD'
}

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

export enum MarketOrderBy {
  ACCRUALBLOCKNUMBER = 'accrualBlockNumber',
  BLOCKTIMESTAMP = 'blockTimestamp',
  BORROWAPY = 'borrowAPY',
  BORROWDISTRIBUTIONAPY = 'borrowDistributionAPY',
  BORROWINDEX = 'borrowIndex',
  BORROWRATE = 'borrowRate',
  CASH = 'cash',
  COLLATERALFACTOR = 'collateralFactor',
  EXCHANGERATE = 'exchangeRate',
  ID = 'id',
  INTERESTRATEMODELADDRESS = 'interestRateModelAddress',
  NAME = 'name',
  NUMBEROFBORROWERS = 'numberOfBorrowers',
  NUMBEROFSUPPLIERS = 'numberOfSuppliers',
  RESERVEFACTOR = 'reserveFactor',
  RESERVES = 'reserves',
  SUPPLYAPY = 'supplyAPY',
  SUPPLYDISTRIBUTIONAPY = 'supplyDistributionAPY',
  SUPPLYRATE = 'supplyRate',
  SYMBOL = 'symbol',
  TOTALBORROWS = 'totalBorrows',
  TOTALSUPPLY = 'totalSupply',
  UNDERLYINGADDRESS = 'underlyingAddress',
  UNDERLYINGDECIMALS = 'underlyingDecimals',
  UNDERLYINGNAME = 'underlyingName',
  UNDERLYINGPRICE = 'underlyingPrice',
  UNDERLYINGPRICEUSD = 'underlyingPriceUSD',
  UNDERLYINGSYMBOL = 'underlyingSymbol'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SubgraphErrorPolicy {
  /** Data will be returned even if the subgraph has indexing errors */
  ALLOW = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  DENY = 'deny'
}

export type MyPositionsQueryVariables = Exact<{
  account: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
}>;


export type MyPositionsQuery = { __typename?: 'Query', accountCTokens: Array<{ __typename?: 'AccountCToken', id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { __typename?: 'Market', name: string, id: string }, account: { __typename?: 'Account', id: string, tokens: Array<{ __typename?: 'AccountCToken', id: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { __typename?: 'Market', id: string, name: string, collateralFactor: string, underlyingAddress: string } }> } }> };

export type PositionsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsCountQuery = { __typename?: 'Query', accountCTokens: Array<{ __typename?: 'AccountCToken', id: string }> };

export type MyPositionsCountQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type MyPositionsCountQuery = { __typename?: 'Query', accountCTokens: Array<{ __typename?: 'AccountCToken', id: string }> };

export type PositionsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
}>;


export type PositionsQuery = { __typename?: 'Query', accountCTokens: Array<{ __typename?: 'AccountCToken', id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { __typename?: 'Market', name: string, id: string }, account: { __typename?: 'Account', id: string, tokens: Array<{ __typename?: 'AccountCToken', id: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { __typename?: 'Market', id: string, name: string, collateralFactor: string, underlyingAddress: string } }> } }> };


export const MyPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"collateralFactor"}},{"kind":"Field","name":{"kind":"Name","value":"underlyingAddress"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"storedBorrowBalance"}},{"kind":"Field","name":{"kind":"Name","value":"cTokenBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}}]}}]}}]} as unknown as DocumentNode<MyPositionsQuery, MyPositionsQueryVariables>;
export const PositionsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PositionsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PositionsCountQuery, PositionsCountQueryVariables>;
export const MyPositionsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyPositionsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MyPositionsCountQuery, MyPositionsCountQueryVariables>;
export const PositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Positions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"storedBorrowBalance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"collateralFactor"}},{"kind":"Field","name":{"kind":"Name","value":"underlyingAddress"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"storedBorrowBalance"}},{"kind":"Field","name":{"kind":"Name","value":"cTokenBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingRepaid"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingSupplied"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderlyingBorrowed"}}]}}]}}]} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;