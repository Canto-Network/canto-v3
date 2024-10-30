import { gql } from "./generated";

export const myPositionsQuery = gql(`
  query MyPositions($account: String!, $skip: Int!, $first: Int!) {
    accountCTokens(
      orderBy: storedBorrowBalance
      orderDirection: desc
      where: { account: $account }
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
        tokens{
        id
        totalUnderlyingRepaid
        totalUnderlyingSupplied
        totalUnderlyingBorrowed
        market{
          collateralFactor
          underlyingAddress
          underlyingPriceUSD
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
`);
