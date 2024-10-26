import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === "development",
  cache: new InMemoryCache(),
  link: ApolloLink.from([new HttpLink({ uri: "/graphql" })]),
});
