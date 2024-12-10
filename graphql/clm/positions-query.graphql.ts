import { gql } from "../generated/clm";

export const positionsQuery = gql(`
  query Positions($skip: Int!, $first: Int!, $orderDirection: OrderDirection!) {
    accountCTokens(
      orderBy: storedBorrowBalance, 
      orderDirection: $orderDirection,
      skip: $skip,
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
