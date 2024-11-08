import { gql } from "../generated/clm";

export const marketsQuery = gql(`
  query Markets {
    markets(orderDirection: desc, orderBy: totalSupply) {
      id
      name
      totalBorrows
      totalSupply
      underlyingAddress
      underlyingDecimals
    }
  }
`);
