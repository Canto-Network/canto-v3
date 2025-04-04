import { CosmosNetwork } from "@/config/interfaces";
import {
  checkCosmosAddress,
  getCosmosAddressLink,
  getCosmosTransactionLink,
} from "../helpers";

const cosmosHubBlockExplorer = "https://www.mintscan.io/cosmos";

export const COSMOS_HUB: CosmosNetwork = {
  id: "cosmoshub-4",
  chainId: "cosmoshub-4",
  icon: "/icons/atom.svg",
  name: "Cosmos Hub",
  isTestChain: false,
  rpcUrl:
    "https://cosmos.blockpi.network/rpc/v1/4f6362319a874ebfd2fcabb3b5d54a8549104b26",
  restEndpoint:
    "https://cosmos.blockpi.network/lcd/v1/4f6362319a874ebfd2fcabb3b5d54a8549104b26",
  extraEndpoints: ["https://rest.cosmoshub.goldenratiostaking.net"],
  latestBlockEndpoint: "/cosmos/base/tendermint/v1beta1",
  addressPrefix: "cosmos",
  checkAddress: function (address) {
    return checkCosmosAddress(this.addressPrefix)(address);
  },
  nativeCurrency: {
    name: "Atom",
    baseName: "uatom",
    symbol: "ATOM",
    decimals: 6,
  },
  blockExplorer: {
    url: cosmosHubBlockExplorer,
    getAddressLink: getCosmosAddressLink(cosmosHubBlockExplorer),
    getTransactionLink: getCosmosTransactionLink(cosmosHubBlockExplorer),
  },
};
