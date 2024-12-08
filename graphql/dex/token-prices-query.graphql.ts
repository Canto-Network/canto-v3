import { gql } from "../generated/dex";

export const GET_TOKEN_PRICES = gql(`
  query GetTokenPrices($tokenId: ID!) {
    tokenDayDatas(
      where: { token_: { id: $tokenId } }
      orderDirection: desc
      orderBy: date
      first: 1
    ) {
      token {
        id
        derivedETH
        name
        symbol
        totalLiquidity
      }
      priceUSD
      date
    }
  }
`);
