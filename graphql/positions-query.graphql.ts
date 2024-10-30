import { gql } from "./generated";

export const positionsQuery = gql(`
  query Positions($skip: Int!, $first: Int!) {
    accountCTokens(
      orderBy: storedBorrowBalance, 
      orderDirection: desc,
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
        tokens{
        id
        totalUnderlyingRepaid
        totalUnderlyingSupplied
        totalUnderlyingBorrowed
        market{
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
