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
  /**
   * 8 bytes signed integer
   *
   */
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

export type Bundle = {
  ethPrice: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
};

export type BundleFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BundleFilter>>>;
  ethPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BundleFilter>>>;
};

export type BundleOrderBy =
  | 'ethPrice'
  | 'id';

export type Burn = {
  amount0?: Maybe<Scalars['BigDecimal']['output']>;
  amount1?: Maybe<Scalars['BigDecimal']['output']>;
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']['output']>;
  feeTo?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  liquidity: Scalars['BigDecimal']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
  needsComplete: Scalars['Boolean']['output'];
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to?: Maybe<Scalars['Bytes']['output']>;
  transaction: Transaction;
};

export type BurnFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BurnFilter>>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeTo?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_gt?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_gte?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeTo_lt?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_lte?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  needsComplete?: InputMaybe<Scalars['Boolean']['input']>;
  needsComplete_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  needsComplete_not?: InputMaybe<Scalars['Boolean']['input']>;
  needsComplete_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BurnFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<TransactionFilter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type BurnOrderBy =
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'feeLiquidity'
  | 'feeTo'
  | 'id'
  | 'liquidity'
  | 'logIndex'
  | 'needsComplete'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'sender'
  | 'timestamp'
  | 'to'
  | 'transaction'
  | 'transaction__blockNumber'
  | 'transaction__id'
  | 'transaction__timestamp';

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

export type LiquidityPosition = {
  id: Scalars['ID']['output'];
  liquidityTokenBalance: Scalars['BigDecimal']['output'];
  pair: Pair;
  user: User;
};

export type LiquidityPositionSnapshot = {
  block: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  liquidityPosition: LiquidityPosition;
  liquidityTokenBalance: Scalars['BigDecimal']['output'];
  liquidityTokenTotalSupply: Scalars['BigDecimal']['output'];
  pair: Pair;
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  reserveUSD: Scalars['BigDecimal']['output'];
  timestamp: Scalars['Int']['output'];
  token0PriceUSD: Scalars['BigDecimal']['output'];
  token1PriceUSD: Scalars['BigDecimal']['output'];
  user: User;
};

export type LiquidityPositionSnapshotFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidityPositionSnapshotFilter>>>;
  block?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidityPosition?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_?: InputMaybe<LiquidityPositionFilter>;
  liquidityPosition_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_gt?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_gte?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityPosition_lt?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_lte?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityPosition_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityTokenTotalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityTokenTotalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenTotalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<LiquidityPositionSnapshotFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  token0PriceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1PriceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<UserFilter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type LiquidityPositionSnapshotOrderBy =
  | 'block'
  | 'id'
  | 'liquidityPosition'
  | 'liquidityPosition__id'
  | 'liquidityPosition__liquidityTokenBalance'
  | 'liquidityTokenBalance'
  | 'liquidityTokenTotalSupply'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'reserve0'
  | 'reserve1'
  | 'reserveUSD'
  | 'timestamp'
  | 'token0PriceUSD'
  | 'token1PriceUSD'
  | 'user'
  | 'user__id'
  | 'user__usdSwapped';

export type LiquidityPositionFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidityPositionFilter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<LiquidityPositionFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<UserFilter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type LiquidityPositionOrderBy =
  | 'id'
  | 'liquidityTokenBalance'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'user'
  | 'user__id'
  | 'user__usdSwapped';

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

export type Mint = {
  amount0?: Maybe<Scalars['BigDecimal']['output']>;
  amount1?: Maybe<Scalars['BigDecimal']['output']>;
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']['output']>;
  feeTo?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  liquidity: Scalars['BigDecimal']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['Bytes']['output'];
  transaction: Transaction;
};

export type MintFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<MintFilter>>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeTo?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_gt?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_gte?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeTo_lt?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_lte?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MintFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<TransactionFilter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type MintOrderBy =
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'feeLiquidity'
  | 'feeTo'
  | 'id'
  | 'liquidity'
  | 'logIndex'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'sender'
  | 'timestamp'
  | 'to'
  | 'transaction'
  | 'transaction__blockNumber'
  | 'transaction__id'
  | 'transaction__timestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pair = {
  burns: Array<Burn>;
  createdAtBlockNumber: Scalars['BigInt']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityProviderCount: Scalars['BigInt']['output'];
  mints: Array<Mint>;
  pairHourData: Array<PairHourData>;
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  reserveETH: Scalars['BigDecimal']['output'];
  reserveUSD: Scalars['BigDecimal']['output'];
  stable: Scalars['Boolean']['output'];
  swaps: Array<Swap>;
  token0: Token;
  token0Price: Scalars['BigDecimal']['output'];
  token1: Token;
  token1Price: Scalars['BigDecimal']['output'];
  totalSupply: Scalars['BigDecimal']['output'];
  trackedReserveETH: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
};


export type PairBurnsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BurnOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BurnFilter>;
};


export type PairLiquidityPositionSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshotOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiquidityPositionSnapshotFilter>;
};


export type PairLiquidityPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiquidityPositionFilter>;
};


export type PairMintsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MintFilter>;
};


export type PairPairHourDataArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairHourDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PairHourDataFilter>;
};


export type PairSwapsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SwapFilter>;
};

export type PairDayData = {
  dailyTxns: Scalars['BigInt']['output'];
  dailyVolumeToken0: Scalars['BigDecimal']['output'];
  dailyVolumeToken1: Scalars['BigDecimal']['output'];
  dailyVolumeUSD: Scalars['BigDecimal']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  pairAddress: Scalars['Bytes']['output'];
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  reserveUSD: Scalars['BigDecimal']['output'];
  token0: Token;
  token1: Token;
  totalSupply: Scalars['BigDecimal']['output'];
};

export type PairDayDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairDayDataFilter>>>;
  dailyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyVolumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<PairDayDataFilter>>>;
  pairAddress?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pairAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<TokenFilter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<TokenFilter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type PairDayDataOrderBy =
  | 'dailyTxns'
  | 'dailyVolumeToken0'
  | 'dailyVolumeToken1'
  | 'dailyVolumeUSD'
  | 'date'
  | 'id'
  | 'pairAddress'
  | 'reserve0'
  | 'reserve1'
  | 'reserveUSD'
  | 'token0'
  | 'token0__decimals'
  | 'token0__derivedETH'
  | 'token0__id'
  | 'token0__name'
  | 'token0__symbol'
  | 'token0__totalLiquidity'
  | 'token0__totalSupply'
  | 'token0__tradeVolume'
  | 'token0__tradeVolumeUSD'
  | 'token0__txCount'
  | 'token0__untrackedVolumeUSD'
  | 'token1'
  | 'token1__decimals'
  | 'token1__derivedETH'
  | 'token1__id'
  | 'token1__name'
  | 'token1__symbol'
  | 'token1__totalLiquidity'
  | 'token1__totalSupply'
  | 'token1__tradeVolume'
  | 'token1__tradeVolumeUSD'
  | 'token1__txCount'
  | 'token1__untrackedVolumeUSD'
  | 'totalSupply';

export type PairHourData = {
  hourStartUnix: Scalars['Int']['output'];
  hourlyTxns: Scalars['BigInt']['output'];
  hourlyVolumeToken0: Scalars['BigDecimal']['output'];
  hourlyVolumeToken1: Scalars['BigDecimal']['output'];
  hourlyVolumeUSD: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  pair: Pair;
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  reserveUSD: Scalars['BigDecimal']['output'];
  totalSupply: Scalars['BigDecimal']['output'];
};

export type PairHourDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairHourDataFilter>>>;
  hourStartUnix?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourlyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyVolumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PairHourDataFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type PairHourDataOrderBy =
  | 'hourStartUnix'
  | 'hourlyTxns'
  | 'hourlyVolumeToken0'
  | 'hourlyVolumeToken1'
  | 'hourlyVolumeUSD'
  | 'id'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'reserve0'
  | 'reserve1'
  | 'reserveUSD'
  | 'totalSupply';

export type PairMap = {
  id: Scalars['ID']['output'];
  pairIds: Array<Scalars['ID']['output']>;
};

export type PairMapFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairMapFilter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PairMapFilter>>>;
  pairIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  pairIds_contains?: InputMaybe<Array<Scalars['ID']['input']>>;
  pairIds_contains_nocase?: InputMaybe<Array<Scalars['ID']['input']>>;
  pairIds_not?: InputMaybe<Array<Scalars['ID']['input']>>;
  pairIds_not_contains?: InputMaybe<Array<Scalars['ID']['input']>>;
  pairIds_not_contains_nocase?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type PairMapOrderBy =
  | 'id'
  | 'pairIds';

export type PairFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairFilter>>>;
  burns_?: InputMaybe<BurnFilter>;
  createdAtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidityPositionSnapshots_?: InputMaybe<LiquidityPositionSnapshotFilter>;
  liquidityPositions_?: InputMaybe<LiquidityPositionFilter>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mints_?: InputMaybe<MintFilter>;
  or?: InputMaybe<Array<InputMaybe<PairFilter>>>;
  pairHourData_?: InputMaybe<PairHourDataFilter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stable?: InputMaybe<Scalars['Boolean']['input']>;
  stable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  stable_not?: InputMaybe<Scalars['Boolean']['input']>;
  stable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  swaps_?: InputMaybe<SwapFilter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0_?: InputMaybe<TokenFilter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1_?: InputMaybe<TokenFilter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  trackedReserveETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  trackedReserveETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  trackedReserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type PairOrderBy =
  | 'burns'
  | 'createdAtBlockNumber'
  | 'createdAtTimestamp'
  | 'id'
  | 'liquidityPositionSnapshots'
  | 'liquidityPositions'
  | 'liquidityProviderCount'
  | 'mints'
  | 'pairHourData'
  | 'reserve0'
  | 'reserve1'
  | 'reserveETH'
  | 'reserveUSD'
  | 'stable'
  | 'swaps'
  | 'token0'
  | 'token0Price'
  | 'token0__decimals'
  | 'token0__derivedETH'
  | 'token0__id'
  | 'token0__name'
  | 'token0__symbol'
  | 'token0__totalLiquidity'
  | 'token0__totalSupply'
  | 'token0__tradeVolume'
  | 'token0__tradeVolumeUSD'
  | 'token0__txCount'
  | 'token0__untrackedVolumeUSD'
  | 'token1'
  | 'token1Price'
  | 'token1__decimals'
  | 'token1__derivedETH'
  | 'token1__id'
  | 'token1__name'
  | 'token1__symbol'
  | 'token1__totalLiquidity'
  | 'token1__totalSupply'
  | 'token1__tradeVolume'
  | 'token1__tradeVolumeUSD'
  | 'token1__txCount'
  | 'token1__untrackedVolumeUSD'
  | 'totalSupply'
  | 'trackedReserveETH'
  | 'txCount'
  | 'untrackedVolumeUSD'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD';

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  account?: Maybe<Account>;
  accountCToken?: Maybe<AccountCToken>;
  accountCTokens: Array<AccountCToken>;
  accounts: Array<Account>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  comptroller?: Maybe<Comptroller>;
  comptrollerDayData?: Maybe<ComptrollerDayData>;
  comptrollerDayDatas: Array<ComptrollerDayData>;
  comptrollers: Array<Comptroller>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  marketHourData?: Maybe<MarketHourData>;
  marketHourDatas: Array<MarketHourData>;
  markets: Array<Market>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairMap?: Maybe<PairMap>;
  pairMaps: Array<PairMap>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  uniswapDayData?: Maybe<UniswapDayData>;
  uniswapDayDatas: Array<UniswapDayData>;
  uniswapFactories: Array<UniswapFactory>;
  uniswapFactory?: Maybe<UniswapFactory>;
  user?: Maybe<User>;
  users: Array<User>;
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


export type QueryBundleArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryBundlesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BundleOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<BundleFilter>;
};


export type QueryBurnArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryBurnsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BurnOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<BurnFilter>;
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


export type QueryLiquidityPositionArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryLiquidityPositionSnapshotArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryLiquidityPositionSnapshotsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshotOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LiquidityPositionSnapshotFilter>;
};


export type QueryLiquidityPositionsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LiquidityPositionFilter>;
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


export type QueryMintArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryMintsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MintFilter>;
};


export type QueryPairArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryPairDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryPairDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairDayDataFilter>;
};


export type QueryPairHourDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryPairHourDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairHourDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairHourDataFilter>;
};


export type QueryPairMapArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryPairMapsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairMapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairMapFilter>;
};


export type QueryPairsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairFilter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<SwapFilter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryTokenDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryTokenDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TokenDayDataFilter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TokenFilter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransactionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TransactionFilter>;
};


export type QueryUniswapDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryUniswapDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniswapDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UniswapDayDataFilter>;
};


export type QueryUniswapFactoriesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniswapFactoryOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UniswapFactoryFilter>;
};


export type QueryUniswapFactoryArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryUserArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryUsersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UserFilter>;
};

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  account?: Maybe<Account>;
  accountCToken?: Maybe<AccountCToken>;
  accountCTokens: Array<AccountCToken>;
  accounts: Array<Account>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  comptroller?: Maybe<Comptroller>;
  comptrollerDayData?: Maybe<ComptrollerDayData>;
  comptrollerDayDatas: Array<ComptrollerDayData>;
  comptrollers: Array<Comptroller>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  marketHourData?: Maybe<MarketHourData>;
  marketHourDatas: Array<MarketHourData>;
  markets: Array<Market>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairMap?: Maybe<PairMap>;
  pairMaps: Array<PairMap>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  uniswapDayData?: Maybe<UniswapDayData>;
  uniswapDayDatas: Array<UniswapDayData>;
  uniswapFactories: Array<UniswapFactory>;
  uniswapFactory?: Maybe<UniswapFactory>;
  user?: Maybe<User>;
  users: Array<User>;
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


export type SubscriptionBundleArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionBundlesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BundleOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<BundleFilter>;
};


export type SubscriptionBurnArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionBurnsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BurnOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<BurnFilter>;
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


export type SubscriptionLiquidityPositionArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionLiquidityPositionSnapshotArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionLiquidityPositionSnapshotsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshotOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LiquidityPositionSnapshotFilter>;
};


export type SubscriptionLiquidityPositionsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LiquidityPositionFilter>;
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


export type SubscriptionMintArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionMintsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<MintFilter>;
};


export type SubscriptionPairArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionPairDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionPairDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairDayDataFilter>;
};


export type SubscriptionPairHourDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionPairHourDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairHourDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairHourDataFilter>;
};


export type SubscriptionPairMapArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionPairMapsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairMapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairMapFilter>;
};


export type SubscriptionPairsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<PairFilter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<SwapFilter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionTokenDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionTokenDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TokenDayDataFilter>;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TokenFilter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransactionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<TransactionFilter>;
};


export type SubscriptionUniswapDayDataArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionUniswapDayDatasArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniswapDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UniswapDayDataFilter>;
};


export type SubscriptionUniswapFactoriesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniswapFactoryOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UniswapFactoryFilter>;
};


export type SubscriptionUniswapFactoryArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UserFilter>;
};

export type Swap = {
  amount0In: Scalars['BigDecimal']['output'];
  amount0Out: Scalars['BigDecimal']['output'];
  amount1In: Scalars['BigDecimal']['output'];
  amount1Out: Scalars['BigDecimal']['output'];
  amountUSD: Scalars['BigDecimal']['output'];
  from: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
  pair: Pair;
  sender: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['Bytes']['output'];
  transaction: Transaction;
};

export type SwapFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0In?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0In_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0In_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0Out?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0Out_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1In?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1In_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1In_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1Out?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1Out_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<PairFilter>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<TransactionFilter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type SwapOrderBy =
  | 'amount0In'
  | 'amount0Out'
  | 'amount1In'
  | 'amount1Out'
  | 'amountUSD'
  | 'from'
  | 'id'
  | 'logIndex'
  | 'pair'
  | 'pair__createdAtBlockNumber'
  | 'pair__createdAtTimestamp'
  | 'pair__id'
  | 'pair__liquidityProviderCount'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__stable'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__totalSupply'
  | 'pair__trackedReserveETH'
  | 'pair__txCount'
  | 'pair__untrackedVolumeUSD'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'sender'
  | 'timestamp'
  | 'to'
  | 'transaction'
  | 'transaction__blockNumber'
  | 'transaction__id'
  | 'transaction__timestamp';

export type Token = {
  decimals: Scalars['BigInt']['output'];
  derivedETH: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pairBase: Array<Pair>;
  pairDayDataBase: Array<PairDayData>;
  pairDayDataQuote: Array<PairDayData>;
  pairQuote: Array<Pair>;
  symbol: Scalars['String']['output'];
  tokenDayData: Array<TokenDayData>;
  totalLiquidity: Scalars['BigDecimal']['output'];
  totalSupply: Scalars['BigInt']['output'];
  tradeVolume: Scalars['BigDecimal']['output'];
  tradeVolumeUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
};


export type TokenPairBaseArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PairFilter>;
};


export type TokenPairDayDataBaseArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PairDayDataFilter>;
};


export type TokenPairDayDataQuoteArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PairDayDataFilter>;
};


export type TokenPairQuoteArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PairFilter>;
};


export type TokenTokenDayDataArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDayDataOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TokenDayDataFilter>;
};

export type TokenDayData = {
  dailyTxns: Scalars['BigInt']['output'];
  dailyVolumeETH: Scalars['BigDecimal']['output'];
  dailyVolumeToken: Scalars['BigDecimal']['output'];
  dailyVolumeUSD: Scalars['BigDecimal']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  priceUSD: Scalars['BigDecimal']['output'];
  token: Token;
  totalLiquidityETH: Scalars['BigDecimal']['output'];
  totalLiquidityToken: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
};

export type TokenDayDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenDayDataFilter>>>;
  dailyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<TokenDayDataFilter>>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenFilter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityToken?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityToken_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityToken_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type TokenDayDataOrderBy =
  | 'dailyTxns'
  | 'dailyVolumeETH'
  | 'dailyVolumeToken'
  | 'dailyVolumeUSD'
  | 'date'
  | 'id'
  | 'priceUSD'
  | 'token'
  | 'token__decimals'
  | 'token__derivedETH'
  | 'token__id'
  | 'token__name'
  | 'token__symbol'
  | 'token__totalLiquidity'
  | 'token__totalSupply'
  | 'token__tradeVolume'
  | 'token__tradeVolumeUSD'
  | 'token__txCount'
  | 'token__untrackedVolumeUSD'
  | 'totalLiquidityETH'
  | 'totalLiquidityToken'
  | 'totalLiquidityUSD';

export type TokenFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  pairBase_?: InputMaybe<PairFilter>;
  pairDayDataBase_?: InputMaybe<PairDayDataFilter>;
  pairDayDataQuote_?: InputMaybe<PairDayDataFilter>;
  pairQuote_?: InputMaybe<PairFilter>;
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
  tokenDayData_?: InputMaybe<TokenDayDataFilter>;
  totalLiquidity?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tradeVolume?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tradeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tradeVolume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tradeVolume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tradeVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type TokenOrderBy =
  | 'decimals'
  | 'derivedETH'
  | 'id'
  | 'name'
  | 'pairBase'
  | 'pairDayDataBase'
  | 'pairDayDataQuote'
  | 'pairQuote'
  | 'symbol'
  | 'tokenDayData'
  | 'totalLiquidity'
  | 'totalSupply'
  | 'tradeVolume'
  | 'tradeVolumeUSD'
  | 'txCount'
  | 'untrackedVolumeUSD';

export type Transaction = {
  blockNumber: Scalars['BigInt']['output'];
  burns: Array<Burn>;
  id: Scalars['ID']['output'];
  mints: Array<Mint>;
  swaps: Array<Swap>;
  timestamp: Scalars['BigInt']['output'];
};


export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BurnOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BurnFilter>;
};


export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MintFilter>;
};


export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SwapFilter>;
};

export type TransactionFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransactionFilter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  burns?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_?: InputMaybe<BurnFilter>;
  burns_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_not?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mints?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_?: InputMaybe<MintFilter>;
  mints_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_not?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TransactionFilter>>>;
  swaps?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_?: InputMaybe<SwapFilter>;
  swaps_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_not?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type TransactionOrderBy =
  | 'blockNumber'
  | 'burns'
  | 'id'
  | 'mints'
  | 'swaps'
  | 'timestamp';

export type UniswapDayData = {
  dailyVolumeETH: Scalars['BigDecimal']['output'];
  dailyVolumeUSD: Scalars['BigDecimal']['output'];
  dailyVolumeUntracked: Scalars['BigDecimal']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalLiquidityETH: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
  totalVolumeETH: Scalars['BigDecimal']['output'];
  totalVolumeUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
};

export type UniswapDayDataFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UniswapDayDataFilter>>>;
  dailyVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<UniswapDayDataFilter>>>;
  totalLiquidityETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type UniswapDayDataOrderBy =
  | 'dailyVolumeETH'
  | 'dailyVolumeUSD'
  | 'dailyVolumeUntracked'
  | 'date'
  | 'id'
  | 'totalLiquidityETH'
  | 'totalLiquidityUSD'
  | 'totalVolumeETH'
  | 'totalVolumeUSD'
  | 'txCount';

export type UniswapFactory = {
  id: Scalars['ID']['output'];
  pairCount: Scalars['Int']['output'];
  totalLiquidityETH: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
  totalVolumeETH: Scalars['BigDecimal']['output'];
  totalVolumeUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
};

export type UniswapFactoryFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UniswapFactoryFilter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<UniswapFactoryFilter>>>;
  pairCount?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pairCount_lt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_lte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_not?: InputMaybe<Scalars['Int']['input']>;
  pairCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalLiquidityETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type UniswapFactoryOrderBy =
  | 'id'
  | 'pairCount'
  | 'totalLiquidityETH'
  | 'totalLiquidityUSD'
  | 'totalVolumeETH'
  | 'totalVolumeUSD'
  | 'txCount'
  | 'untrackedVolumeUSD';

export type User = {
  id: Scalars['ID']['output'];
  liquidityPositions?: Maybe<Array<LiquidityPosition>>;
  usdSwapped: Scalars['BigDecimal']['output'];
};


export type UserLiquidityPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPositionOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiquidityPositionFilter>;
};

export type UserFilter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidityPositions_?: InputMaybe<LiquidityPositionFilter>;
  or?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  usdSwapped?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  usdSwapped_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export type UserOrderBy =
  | 'id'
  | 'liquidityPositions'
  | 'usdSwapped';

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
  skip: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
}>;


export type MyPositionsQuery = { accountCTokens: Array<{ id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { name: string, id: string }, account: { id: string, tokens: Array<{ id: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { id: string, name: string, collateralFactor: string, underlyingAddress: string } }> } }> };

export type PositionsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsCountQuery = { accountCTokens: Array<{ id: string }> };

export type MyPositionsCountQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type MyPositionsCountQuery = { accountCTokens: Array<{ id: string }> };

export type PositionsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
}>;


export type PositionsQuery = { accountCTokens: Array<{ id: string, storedBorrowBalance: string, cTokenBalance: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { name: string, id: string }, account: { id: string, tokens: Array<{ id: string, totalUnderlyingRepaid: string, totalUnderlyingSupplied: string, totalUnderlyingBorrowed: string, market: { id: string, name: string, collateralFactor: string, underlyingAddress: string } }> } }> };


export const MyPositionsDocument = gql`
    query MyPositions($account: String!, $skip: Int!, $first: Int!, $orderDirection: OrderDirection!) {
  accountCTokens(
    orderBy: storedBorrowBalance
    orderDirection: $orderDirection
    where: {account: $account}
    skip: $skip
    first: $first
  ) {
    id
    market {
      name
      id
    }
    account {
      id
      tokens {
        id
        totalUnderlyingRepaid
        totalUnderlyingSupplied
        totalUnderlyingBorrowed
        market {
          id
          name
          collateralFactor
          underlyingAddress
        }
      }
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
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderDirection: // value for 'orderDirection'
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
export const PositionsCountDocument = gql`
    query PositionsCount {
  accountCTokens(orderBy: storedBorrowBalance, orderDirection: desc) {
    id
  }
}
    `;

/**
 * __usePositionsCountQuery__
 *
 * To run a query within a React component, call `usePositionsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsCountQuery(baseOptions?: Apollo.QueryHookOptions<PositionsCountQuery, PositionsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionsCountQuery, PositionsCountQueryVariables>(PositionsCountDocument, options);
      }
export function usePositionsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionsCountQuery, PositionsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionsCountQuery, PositionsCountQueryVariables>(PositionsCountDocument, options);
        }
export function usePositionsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionsCountQuery, PositionsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PositionsCountQuery, PositionsCountQueryVariables>(PositionsCountDocument, options);
        }
export type PositionsCountQueryHookResult = ReturnType<typeof usePositionsCountQuery>;
export type PositionsCountLazyQueryHookResult = ReturnType<typeof usePositionsCountLazyQuery>;
export type PositionsCountSuspenseQueryHookResult = ReturnType<typeof usePositionsCountSuspenseQuery>;
export type PositionsCountQueryResult = Apollo.QueryResult<PositionsCountQuery, PositionsCountQueryVariables>;
export const MyPositionsCountDocument = gql`
    query MyPositionsCount($account: String!) {
  accountCTokens(
    where: {account: $account}
    orderBy: storedBorrowBalance
    orderDirection: desc
  ) {
    id
  }
}
    `;

/**
 * __useMyPositionsCountQuery__
 *
 * To run a query within a React component, call `useMyPositionsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPositionsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPositionsCountQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useMyPositionsCountQuery(baseOptions: Apollo.QueryHookOptions<MyPositionsCountQuery, MyPositionsCountQueryVariables> & ({ variables: MyPositionsCountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPositionsCountQuery, MyPositionsCountQueryVariables>(MyPositionsCountDocument, options);
      }
export function useMyPositionsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPositionsCountQuery, MyPositionsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPositionsCountQuery, MyPositionsCountQueryVariables>(MyPositionsCountDocument, options);
        }
export function useMyPositionsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyPositionsCountQuery, MyPositionsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyPositionsCountQuery, MyPositionsCountQueryVariables>(MyPositionsCountDocument, options);
        }
export type MyPositionsCountQueryHookResult = ReturnType<typeof useMyPositionsCountQuery>;
export type MyPositionsCountLazyQueryHookResult = ReturnType<typeof useMyPositionsCountLazyQuery>;
export type MyPositionsCountSuspenseQueryHookResult = ReturnType<typeof useMyPositionsCountSuspenseQuery>;
export type MyPositionsCountQueryResult = Apollo.QueryResult<MyPositionsCountQuery, MyPositionsCountQueryVariables>;
export const PositionsDocument = gql`
    query Positions($skip: Int!, $first: Int!, $orderDirection: OrderDirection!) {
  accountCTokens(
    orderBy: storedBorrowBalance
    orderDirection: $orderDirection
    skip: $skip
    first: $first
  ) {
    id
    market {
      name
      id
    }
    account {
      id
      tokens {
        id
        totalUnderlyingRepaid
        totalUnderlyingSupplied
        totalUnderlyingBorrowed
        market {
          id
          name
          collateralFactor
          underlyingAddress
        }
      }
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
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderDirection: // value for 'orderDirection'
 *   },
 * });
 */
export function usePositionsQuery(baseOptions: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables> & ({ variables: PositionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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