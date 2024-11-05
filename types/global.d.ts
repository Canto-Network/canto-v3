declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly NEXT_PUBLIC_APP_ENV: "production" | "staging" | "development";
      readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
      readonly BACKEND_SUBGRAPH_URL: string;
      readonly BACKEND_DEX_SUBGRAPH_URL: string;
      readonly NEXT_PUBLIC_CODEX_API_KEY: string;
    }
  }
}

export {};
