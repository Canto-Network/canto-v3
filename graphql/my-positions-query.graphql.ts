import { gql } from "./generated";

export const myPositionsQuery = gql(`
  query MyPositions($account: String!) {
    accountCTokens(
      orderBy: storedBorrowBalance
      orderDirection: desc
      where: { account: $account }
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
