import { gql } from "./generated";

export const myPositionsQuery = gql(`
  query MyPositions($account: String!, $skip: Int!, $first: Int!, $orderDirection: OrderDirection!) {
    accountCTokens(
      orderBy: storedBorrowBalance
      orderDirection: $orderDirection
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
`);
