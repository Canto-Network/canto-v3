import { gql } from "../generated/clm";

export const positionsCountQuery = gql(`
  query PositionsCount {
    accountCTokens(
      orderBy: storedBorrowBalance,
      orderDirection: desc
    ) {
      id
    }
  }
`);

export const myPositionsCountQuery = gql(`
  query MyPositionsCount($account: String!) {
    accountCTokens(
      where: { account: $account }
      orderBy: storedBorrowBalance,
      orderDirection: desc
    ) {
      id
    }
  }
`);
