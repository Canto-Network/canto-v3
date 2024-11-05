import { ApolloContext } from "@/enums/apollo-context.enum";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const mainLink = new HttpLink({ uri: "/graphql" });
const secondLink = new HttpLink({ uri: "/graphql-dex" });

const makeApolloLinkSplit = (
  context: ApolloContext,
  left: ApolloLink,
  right: ApolloLink
) => {
  return ApolloLink.split(
    (operation) => {
      return operation.getContext().endpoint === context;
    },
    left,
    right
  );
};

export const apolloClient = new ApolloClient({
  queryDeduplication: false,
  connectToDevTools: process.env.NODE_ENV === "development",
  cache: new InMemoryCache(),
  link: makeApolloLinkSplit(ApolloContext.MAIN, mainLink, secondLink),
});
