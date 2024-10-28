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
