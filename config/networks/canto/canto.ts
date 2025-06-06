import { CosmosNetwork, EVMNetwork } from "@/config/interfaces";
import {
  checkCosmosAddress,
  getCosmosAddressLink,
  getCosmosTransactionLink,
  getEthAddressLink,
  getEthTransactionLink,
} from "../helpers";

const cantoTestnetBlockExplorerEVM = "https://testnet.tuber.build";

const cantoMainBlockExplorerCosmos = "https://atomscan.com/canto";
const cantoMainBlockExplorerEVM = "https://www.oklink.com/canto";

// canto will have an EVM and COSMOS chain data
const cantoMainnetBaseInfo = {
  name: "Canto",
  icon: "/icons/canto.svg",
  isTestChain: false,
  rpcUrl: "https://canto-rpc.ansybl.io",
  nativeCurrency: {
    name: "Canto",
    baseName: "acanto",
    symbol: "CANTO",
    decimals: 18,
  },
};

export const CANTO_MAINNET_EVM: EVMNetwork = {
  ...cantoMainnetBaseInfo,
  id: "canto-mainnet",
  chainId: 7700,
  blockExplorer: {
    url: cantoMainBlockExplorerEVM,
    getAddressLink: getEthAddressLink(cantoMainBlockExplorerEVM),
    getTransactionLink: getEthTransactionLink(cantoMainBlockExplorerEVM),
  },
  multicall3Address: "0xcA11bde05977b3631167028862bE2a173976CA11",
};

export const CANTO_MAINNET_COSMOS: CosmosNetwork = {
  ...cantoMainnetBaseInfo,
  id: "canto_7700-1",
  chainId: "canto_7700-1",
  restEndpoint: "https://archive-f12dacd6-1-canto.ansybl.io/api",
  addressPrefix: "canto",
  checkAddress: function (address) {
    return checkCosmosAddress(this.addressPrefix)(address);
  },
  latestBlockEndpoint: "/cosmos/base/tendermint/v1beta1",
  blockExplorer: {
    url: cantoMainBlockExplorerCosmos,
    getAddressLink: getCosmosAddressLink(cantoMainBlockExplorerCosmos),
    getTransactionLink: getCosmosTransactionLink(cantoMainBlockExplorerCosmos),
  },
};

// Testnet
const cantoTestnetBaseInfo = {
  name: "Canto Testnet",
  icon: "/icons/canto.svg",
  isTestChain: true,
  rpcUrl: "https://canto-testnet.plexnode.wtf",
  nativeCurrency: {
    name: "Canto",
    baseName: "acanto",
    symbol: "CANTO",
    decimals: 18,
  },
};
export const CANTO_TESTNET_EVM: EVMNetwork = {
  ...cantoTestnetBaseInfo,
  id: "canto-testnet",
  chainId: 7701,
  blockExplorer: {
    url: cantoTestnetBlockExplorerEVM,
    getAddressLink: getEthAddressLink(cantoTestnetBlockExplorerEVM),
    getTransactionLink: getEthTransactionLink(cantoTestnetBlockExplorerEVM),
  },
  multicall3Address: "0xcA11bde05977b3631167028862bE2a173976CA11",
};

export const CANTO_TESTNET_COSMOS: CosmosNetwork = {
  ...cantoTestnetBaseInfo,
  id: "canto_7701-1",
  chainId: "canto_7701-1",
  restEndpoint: "https://api-testnet.plexnode.wtf",
  addressPrefix: "canto",
  checkAddress: function (address) {
    return checkCosmosAddress(this.addressPrefix)(address);
  },
  blockExplorer: {
    url: cantoMainBlockExplorerCosmos,
    getAddressLink: getCosmosAddressLink(cantoMainBlockExplorerCosmos),
    getTransactionLink: getCosmosTransactionLink(cantoMainBlockExplorerCosmos),
  },
};
