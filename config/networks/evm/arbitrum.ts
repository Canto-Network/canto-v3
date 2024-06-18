import { EVMNetwork } from "@/config/interfaces";
import { getEthAddressLink, getEthTransactionLink } from "../helpers";

const arbscanUrl = "https://arbiscan.io";

export const ARBITRUM: EVMNetwork = {
  id: "arb-mainnet",
  chainId: 42161,
  icon: "/icons/arb.svg",
  name: "Arbitrum",
  isTestChain: false,
  rpcUrl: "https://arb1.arbitrum.io/rpc",
  nativeCurrency: {
    name: "ETH",
    baseName: "wei",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorer: {
    url: arbscanUrl,
    getAddressLink: getEthAddressLink(arbscanUrl),
    getTransactionLink: getEthTransactionLink(arbscanUrl),
  },
  multicall3Address: "0xcA11bde05977b3631167028862bE2a173976CA11",
};
