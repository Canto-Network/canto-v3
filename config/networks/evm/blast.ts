import { EVMNetwork } from "@/config/interfaces";
import { getEthAddressLink, getEthTransactionLink } from "../helpers";

const blastScanUrl = "https://blastscan.io";

export const BLAST: EVMNetwork = {
  id: "blast-mainnet",
  chainId: 81457,
  icon: "/icons/blast.svg",
  name: "Blast",
  isTestChain: false,
  rpcUrl: "https://rpc.ankr.com/blast",
  nativeCurrency: {
    name: "ETH",
    baseName: "wei",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorer: {
    url: blastScanUrl,
    getAddressLink: getEthAddressLink(blastScanUrl),
    getTransactionLink: getEthTransactionLink(blastScanUrl),
  },
  multicall3Address: "0xcA11bde05977b3631167028862bE2a173976CA11",
};
