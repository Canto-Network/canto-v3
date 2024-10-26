import { gql } from "./generated";

export const positionsQuery = gql(`
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
  `);
