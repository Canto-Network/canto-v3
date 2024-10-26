import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  Int8: { input: string; output: string; }
};

export type Account = {
  /** Count user has been liquidated */
  countLiquidated: Scalars['Int']['output'];
  /** Count user has liquidated others */
  countLiquidator: Scalars['Int']['output'];
  /** True if user has ever borrowed */
  hasBorrowed: Scalars['Boolean']['output'];
  /** User ETH address */
  id: Scalars['ID']['output'];
  /** Array of CTokens user is in */
  tokens: Array<AccountCToken>;
};


export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountCTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountCTokenFilter>;
};

export type AccountCToken = {
  /** Relation to user */
  account: Account;
  /** The value of the borrow index upon users last interaction */
  accountBorrowIndex: Scalars['BigDecimal']['output'];
  /** Block number this asset was updated at in the contract */
  accrualBlockNumber: Scalars['Int']['output'];
  /** CToken balance of the user */
  cTokenBalance: Scalars['BigDecimal']['output'];
  /** True if user is entered, false if they are exited */
  enteredMarket: Scalars['Boolean']['output'];
  /** Concatenation of CToken address and user address */
  id: Scalars['ID']['output'];
  /** Relation to market */
  market: Market;
  /** Current borrow balance stored in contract (exclusive of interest since accrualBlockNumber) */
  storedBorrowBalance: Scalars['BigDecimal']['output'];
  /** Symbol of the cToken */
  symbol: Scalars['String']['output'];
  /** Total amount underlying borrowed, exclusive of interest */
  totalUnderlyingBorrowed: Scalars['BigDecimal']['output'];
  /** Total amount of underling redeemed */
  totalUnderlyingRedeemed: Scalars['BigDecimal']['output'];
  /** Total amount underlying repaid */
  totalUnderlyingRepaid: Scalars['BigDecimal']['output'];
  /** Total amount of underlying supplied */
  totalUnderlyingSupplied: Scalars['BigDecimal']['output'];
  /** Hashes of all user transactions */
  transactionHashes: Array<Scalars['Bytes']['output']>;
  /** Times of all user transactions */
  transactionTimes: Array<Scalars['Int']['output']>;
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

export type Comptroller = {
  /** Factor used to determine repayAmount for liquidating */
  closeFactor?: Maybe<Scalars['BigInt']['output']>;
  /** ID is set to 1 */
  id: Scalars['ID']['output'];
  /** The percent bonus liquidators get for liquidating */
  liquidationIncentive?: Maybe<Scalars['BigInt']['output']>;
  /** Max assets a single user can enter */
  maxAssets?: Maybe<Scalars['BigInt']['output']>;
  /** Address of price oracle the comptroller uses */
  priceOracle?: Maybe<Scalars['Bytes']['output']>;
  totalLiquidityNOTE: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
};

export type ComptrollerDayData = {
  dailyBorrowTxns: Scalars['BigInt']['output'];
  dailyBorrowVolumeNOTE: Scalars['BigDecimal']['output'];
  dailyBorrowVolumeUSD: Scalars['BigDecimal']['output'];
  dailySupplyTxns: Scalars['BigInt']['output'];
  dailySupplyVolumeNOTE: Scalars['BigDecimal']['output'];
  dailySupplyVolumeUSD: Scalars['BigDecimal']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalLiquidityNOTE: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
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

export type Market = {
  /** Block the market is updated to */
  accrualBlockNumber: Scalars['Int']['output'];
  /** Timestamp the market was most recently updated */
  blockTimestamp: Scalars['Int']['output'];
  /** borrow APY */
  borrowAPY: Scalars['BigDecimal']['output'];
  /** borrowDistribution APY */
  borrowDistributionAPY: Scalars['BigDecimal']['output'];
  /** The history of the markets borrow index return (Think S&P 500) */
  borrowIndex: Scalars['BigDecimal']['output'];
  /** Yearly borrow rate. With x blocks per year at 5 s/block */
  borrowRate: Scalars['BigDecimal']['output'];
  /** The cToken contract balance of ERC20 or ETH */
  cash: Scalars['BigDecimal']['output'];
  /** Collateral factor determining how much one can borrow */
  collateralFactor: Scalars['BigDecimal']['output'];
  /** Exchange rate of tokens / cTokens */
  exchangeRate: Scalars['BigDecimal']['output'];
  /** CToken address */
  id: Scalars['ID']['output'];
  /** Address of the interest rate model */
  interestRateModelAddress: Scalars['Bytes']['output'];
  /** Name of the cToken */
  name: Scalars['String']['output'];
  /** Number of borrowers active in the market */
  numberOfBorrowers: Scalars['Int']['output'];
  /** Number of suppliers active in the market */
  numberOfSuppliers: Scalars['Int']['output'];
  /** The factor determining interest that goes to reserves */
  reserveFactor: Scalars['BigInt']['output'];
  /** Reserves stored in the contract */
  reserves: Scalars['BigDecimal']['output'];
  /** supply APY */
  supplyAPY: Scalars['BigDecimal']['output'];
  /** supply distribution APY */
  supplyDistributionAPY: Scalars['BigDecimal']['output'];
  /** Yearly supply rate. With x blocks per year at 5 s/block */
  supplyRate: Scalars['BigDecimal']['output'];
  /** CToken symbol */
  symbol: Scalars['String']['output'];
  /** Borrows in the market */
  totalBorrows: Scalars['BigDecimal']['output'];
  /** CToken supply. CTokens have 8 decimals */
  totalSupply: Scalars['BigDecimal']['output'];
  /** Underlying token address */
  underlyingAddress: Scalars['Bytes']['output'];
  /** Underlying token decimal length */
  underlyingDecimals: Scalars['Int']['output'];
  /** Underlying token name */
  underlyingName: Scalars['String']['output'];
  /** Underlying price of token in ETH (ex. 0.007 DAI) */
  underlyingPrice: Scalars['BigDecimal']['output'];
  /** Underlying token price in USD */
  underlyingPriceUSD: Scalars['BigDecimal']['output'];
  /** Underlying token symbol */
  underlyingSymbol: Scalars['String']['output'];
};

export type MarketDayData = {
  dailyBorrowTxns: Scalars['BigInt']['output'];
  dailyBorrowVolumeNOTE: Scalars['BigDecimal']['output'];
  dailyBorrowVolumeUSD: Scalars['BigDecimal']['output'];
  dailySupplyTxns: Scalars['BigInt']['output'];
  dailySupplyVolumeNOTE: Scalars['BigDecimal']['output'];
  dailySupplyVolumeUSD: Scalars['BigDecimal']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  market: Market;
  totalLiquidityNOTE: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
};

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

export type MarketHourData = {
  hourStartUnix: Scalars['Int']['output'];
  hourlyBorrowTxns: Scalars['BigInt']['output'];
  hourlyBorrowVolumeNOTE: Scalars['BigDecimal']['output'];
  hourlyBorrowVolumeUSD: Scalars['BigDecimal']['output'];
  hourlySupplyTxns: Scalars['BigInt']['output'];
  hourlySupplyVolumeNOTE: Scalars['BigDecimal']['output'];
  hourlySupplyVolumeUSD: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  market: Market;
  totalLiquidityNOTE: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
};

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

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  account?: Maybe<Account>;
  accountCToken?: Maybe<AccountCToken>;
  accountCTokens: Array<AccountCToken>;
  accounts: Array<Account>;
  comptroller?: Maybe<Comptroller>;
  comptrollerDayData?: Maybe<ComptrollerDayData>;
  comptrollerDayDatas: Array<ComptrollerDayData>;
  comptrollers: Array<Comptroller>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  marketHourData?: Maybe<MarketHourData>;
  marketHourDatas: Array<MarketHourData>;
  markets: Array<Market>;
};


export type QueryMetaArgs = {
  block?: InputMaybe<BlockHeight>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryAccountCTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryAccountCTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountCTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AccountCTokenFilter>;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AccountFilter>;
};


export type QueryComptrollerArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryComptrollerDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryComptrollerDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ComptrollerDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<ComptrollerDayDataFilter>;
};


export type QueryComptrollersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ComptrollerOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<ComptrollerFilter>;
};


export type QueryMarketArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryMarketDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryMarketDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketDayDataFilter>;
};


export type QueryMarketHourDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryMarketHourDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketHourDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketHourDataFilter>;
};


export type QueryMarketsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketFilter>;
};

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  account?: Maybe<Account>;
  accountCToken?: Maybe<AccountCToken>;
  accountCTokens: Array<AccountCToken>;
  accounts: Array<Account>;
  comptroller?: Maybe<Comptroller>;
  comptrollerDayData?: Maybe<ComptrollerDayData>;
  comptrollerDayDatas: Array<ComptrollerDayData>;
  comptrollers: Array<Comptroller>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  marketHourData?: Maybe<MarketHourData>;
  marketHourDatas: Array<MarketHourData>;
  markets: Array<Market>;
};


export type SubscriptionMetaArgs = {
  block?: InputMaybe<BlockHeight>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionAccountCTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionAccountCTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountCTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AccountCTokenFilter>;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AccountFilter>;
};


export type SubscriptionComptrollerArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionComptrollerDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionComptrollerDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ComptrollerDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<ComptrollerDayDataFilter>;
};


export type SubscriptionComptrollersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ComptrollerOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<ComptrollerFilter>;
};


export type SubscriptionMarketArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionMarketDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionMarketDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketDayDataFilter>;
};


export type SubscriptionMarketHourDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionMarketHourDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketHourDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketHourDataFilter>;
};


export type SubscriptionMarketsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MarketFilter>;
};

export type Block = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type Meta = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Block;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

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


export const MyPositionsDocument = gql`
    query MyPositions($account: String!) {
  accountCTokens(
    orderBy: storedBorrowBalance
    orderDirection: desc
    where: {account: $account}
  ) {
    id
    market {
      name
    }
    account {
      id
    }
    storedBorrowBalance
    cTokenBalance
    totalUnderlyingRepaid
    totalUnderlyingSupplied
    totalUnderlyingBorrowed
  }
}
    `;

/**
 * __useMyPositionsQuery__
 *
 * To run a query within a React component, call `useMyPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPositionsQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useMyPositionsQuery(baseOptions: Apollo.QueryHookOptions<MyPositionsQuery, MyPositionsQueryVariables> & ({ variables: MyPositionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPositionsQuery, MyPositionsQueryVariables>(MyPositionsDocument, options);
      }
export function useMyPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPositionsQuery, MyPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPositionsQuery, MyPositionsQueryVariables>(MyPositionsDocument, options);
        }
export function useMyPositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyPositionsQuery, MyPositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyPositionsQuery, MyPositionsQueryVariables>(MyPositionsDocument, options);
        }
export type MyPositionsQueryHookResult = ReturnType<typeof useMyPositionsQuery>;
export type MyPositionsLazyQueryHookResult = ReturnType<typeof useMyPositionsLazyQuery>;
export type MyPositionsSuspenseQueryHookResult = ReturnType<typeof useMyPositionsSuspenseQuery>;
export type MyPositionsQueryResult = Apollo.QueryResult<MyPositionsQuery, MyPositionsQueryVariables>;
export const PositionsDocument = gql`
    query Positions {
  accountCTokens(orderBy: storedBorrowBalance, orderDirection: desc) {
    id
    market {
      name
    }
    account {
      id
    }
    storedBorrowBalance
    cTokenBalance
    totalUnderlyingRepaid
    totalUnderlyingSupplied
    totalUnderlyingBorrowed
  }
}
    `;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(baseOptions?: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
      }
export function usePositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
        }
export function usePositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
        }
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsSuspenseQueryHookResult = ReturnType<typeof usePositionsSuspenseQuery>;
export type PositionsQueryResult = Apollo.QueryResult<PositionsQuery, PositionsQueryVariables>;