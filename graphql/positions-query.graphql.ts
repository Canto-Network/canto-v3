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
`);
