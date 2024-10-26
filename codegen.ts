import type { CodegenConfig } from "@graphql-codegen/cli";

// type mapping for custom scalar types from the graph protocol
const subgraphScalars = {
  BigDecimal: { input: "number | string", output: "string" },
  BigInt: { input: "number | string", output: "string" },
  Bytes: "string",
  Address: "string",
  Int8: "string",
};

const config = {
  schema: [process.env.BACKEND_SUBGRAPH_URL],
  documents: ["graphql/**/*.ts", "!graphql/generated/**"],
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: ["typescript-apollo-client-helpers"],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
        skipTypename: true,
        enumsAsTypes: true,
        useTypeImports: true,
        dedupeFragments: true,
        emitLegacyCommonJSImports: false,
        extractAllFieldsToTypes: true,
        printFieldsOnNewLines: true,
      },
    },
    "./graphql/generated/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        commentDescriptions: true,
      },
    },
    "./hooks/generated/graphql.hook.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
        reactApolloVersion: 3,
        skipTypename: true,
        enumsAsTypes: true,
        useTypeImports: true,
        dedupeFragments: true,
        emitLegacyCommonJSImports: false,
      },
    },
  },
  ignoreNoDocuments: true,
  config: {
    useTypeImports: true,
    namingConvention: {
      typeNames: "change-case-all#pascalCase",
      enumValues: "change-case-all#upperCase",
      transformUnderscore: true,
    },
  },
} satisfies CodegenConfig;

export default config;
