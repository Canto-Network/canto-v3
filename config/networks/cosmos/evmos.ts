import { CosmosNetwork } from "@/config/interfaces";
import {
  checkCosmosAddress,
  getCosmosAddressLink,
  getCosmosTransactionLink,
} from "../helpers";

const evmosBlockExplorer = "https://www.mintscan.io/evmos";

export const EVMOS: CosmosNetwork = {
  id: "evmos_9001-2",
  chainId: "evmos_9001-2",
  icon: "/icons/evmos.svg",
  name: "Evmos",
  isTestChain: false,
  rpcUrl: "https://rpc-evmos.ecostake.com",
  restEndpoint: "https://rest-evmos.ecostake.com",
  addressPrefix: "evmos",
  checkAddress: function (address) {
    return checkCosmosAddress(this.addressPrefix)(address);
  },
  nativeCurrency: {
    name: "Evmos",
    baseName: "aevmos",
    symbol: "EVMOS",
    decimals: 18,
  },
  blockExplorer: {
    url: evmosBlockExplorer,
    getAddressLink: getCosmosAddressLink(evmosBlockExplorer),
    getTransactionLink: getCosmosTransactionLink(evmosBlockExplorer),
  },
};
