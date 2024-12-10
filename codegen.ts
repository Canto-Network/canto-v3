import type { CodegenConfig } from "@graphql-codegen/cli";

// type mapping for custom scalar types from the graph protocol
const subgraphScalars = {
  BigDecimal: { input: "number | string", output: "string" },
  BigInt: { input: "number | string", output: "string" },
  Bytes: "string",
  Address: "string",
  Int8: "string",
  Timestamp: "number",
};

const config: CodegenConfig = {
  generates: {
    // #region CLM Subgraph
    "./graphql/generated/clm/": {
      preset: "client",
      plugins: [],
      schema: [process.env.BACKEND_SUBGRAPH_URL],
      documents: ["graphql/clm/**/*.ts"],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
      },
    },
    "./graphql/generated/clm/schema.graphql": {
      plugins: ["schema-ast"],
      schema: [process.env.BACKEND_SUBGRAPH_URL],
      documents: ["graphql/clm/**/*.ts"],
      config: {
        commentDescriptions: true,
      },
    },
    "./hooks/generated/clm-graphql.hook.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      schema: [process.env.BACKEND_SUBGRAPH_URL],
      documents: ["graphql/clm/**/*.ts"],
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
      },
    },
    // #endregion

    // #region DEX Subgraph
    "./graphql/generated/dex/": {
      preset: "client",
      plugins: [],
      schema: [process.env.BACKEND_DEX_SUBGRAPH_URL],
      documents: ["graphql/dex/**/*.ts"],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
      },
    },
    "./graphql/generated/dex/schema.graphql": {
      plugins: ["schema-ast"],
      schema: [process.env.BACKEND_DEX_SUBGRAPH_URL],
      documents: ["graphql/dex/**/*.ts"],
      config: {
        commentDescriptions: true,
      },
    },
    "./hooks/generated/dex-graphql.hook.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      schema: [process.env.BACKEND_DEX_SUBGRAPH_URL],
      documents: ["graphql/dex/**/*.ts"],
      config: {
        strictScalars: true,
        scalars: subgraphScalars,
        arrayInputCoercion: false,
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
};

export default config;
