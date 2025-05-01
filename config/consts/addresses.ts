import { CLMToken } from "../interfaces";
import { CANTO_MAINNET_EVM, CANTO_TESTNET_EVM } from "../networks";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const GRAVITY_BRIDGE_ETH_ADDRESS =
  "0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906";
export const WETH_MAINNET_ADDRESS =
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const USDT_ETH_MAINNET_ADDRESS =
  "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const PUB_KEY_BOT_ADDRESS =
  "canto1efrhdukv096tmjs7r80m8pqkr3udp9g0uadjfv";

// Canto Core Addresses
const CANTO_CORE_ADDRESSES = {
  accountant: {
    mainnet: "0x4F6DCfa2F69AF7350AAc48D3a3d5B8D03b5378AA",
    testnet: "0xdb91f7127Aa66855845696db77c37d1b6bEAd2db",
  },
  clmLens: {
    mainnet: "0x03957b7D741F0788163e8E382B1Bd7944BcDd560",
    testnet: "0x33c2E2FA0588789119EbDF892eB1e2aDdDcbc8c4",
  },
  cNote: {
    mainnet: "0xEe602429Ef7eCe0a13e4FfE8dBC16e101049504C",
    testnet: "0x04E52476d318CdF739C38BD41A922787D441900c",
  },
  comptroller: {
    mainnet: "0x5E23dC409Fc2F832f83CEc191E245A191a4bCc5C",
    testnet: "0x9514c07bC6e80B652e4264E64f589C59065C231f",
  },
  reservoir: {
    mainnet: "0x07C50Bf0804A06860AeACAcFaf029F9a1c014F91",
    testnet: "0xc481BCA47fa855e92d53a35C5ADA4bbbA3b0AC88",
  },
  router: {
    mainnet: "0xa252eEE9BDe830Ca4793F054B506587027825a8e",
    testnet: "0x463e7d4DF8fE5fb42D024cb57c77b76e6e74417a",
  },
  cCanto: {
    mainnet: "0xB65Ec550ff356EcA6150F733bA9B954b2e0Ca488",
    testnet: "0x477eaF5DECf6299EE937954084f0d53EFc57346F",
  },
  wcanto: {
    mainnet: "0x826551890Dc65655a0Aceca109aB11AbDbD7a07B",
    testnet: "0x04a72466De69109889Db059Cb1A4460Ca0648d9D",
  },
  weth: {
    mainnet: "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687",
    testnet: "0xCa03230E7FB13456326a234443aAd111AC96410A",
  },
} as const;

export const CLM_TOKENS: CLMToken[] = [
  {
    name: "CNOTE",
    id: "0xee602429ef7ece0a13e4ffe8dbc16e101049504c",
    decimals: 18,
  },
  {
    name: "CUSDC",
    id: "0xde59f060d7ee2b612e7360e6c1b97c4d8289ca2e",
    decimals: 6,
  },
  {
    name: "CUSDT",
    id: "0x6b46ba92d7e94ffa658698764f5b8dfd537315a9",
    decimals: 6,
  },
  {
    name: "CUSYC",
    id: "0x0355e393cf0cf5486d9caefb64407b7b1033c2f1",
    decimals: 6,
  },
  {
    name: "CFBILL",
    id: "0xf1f89df149bc5f2b6b29783915d1f9fe2d24459c",
    decimals: 18,
  },
  {
    name: "CIFBILL",
    id: "0x897709fc83ba7a4271d22ed4c01278cc1da8d6f8",
    decimals: 18,
  },
];

type ContractName = keyof typeof CANTO_CORE_ADDRESSES;
// canto chain types
type ChainType = "mainnet" | "testnet";
export function getCantoCoreAddress(
  chainId: number,
  contractName: ContractName
): `0x${string}` | null {
  // make sure on canto chain id
  let chainType: ChainType;
  if (chainId === CANTO_MAINNET_EVM.chainId) chainType = "mainnet";
  else if (chainId === CANTO_TESTNET_EVM.chainId) chainType = "testnet";
  else return null;

  return CANTO_CORE_ADDRESSES[contractName][chainType];
}

export const gravityBridgeEthAddress =
  "0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906";
export const wEthMainnetAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const usdtEthMainnetAddress =
  "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const publicKeyBotAddress =
  "canto1efrhdukv096tmjs7r80m8pqkr3udp9g0uadjfv";
export const cantoAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const usdcAddress = "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd";
export const wCantoAddress = "0x826551890dc65655a0aceca109ab11abdbd7a07b";
export const noteAddress = "0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503";
export const ethAddress = "0x5fd55a1b9fc24967c4db09c513c3ba0dfa7ff687";
export const usdtAddress = "0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75";
export const atomAddress = "0xeceeefcee421d8062ef8d6b4d814efe4dc898265";
export const cantoNotePairAddress =
  "0x1d20635535307208919f0b67c3b2065965a85aa9";
export const cantoAtomPairAddress =
  "0x30838619c55b787bafc3a4cd9aea851c1cfb7b19";
export const noteUsdtPairAddress = "0x35db1f3a6a6f07f82c76fcc415db6cfb1a7df833";
export const noteUsdcPairAddress = "0x9571997a66d63958e1b3de9647c22bd6b9e7228c";
export const cantoEthPairAddress = "0x216400ba362d8fce640085755e47075109718c8b";
export const cadTokenAddress = "0x8F20150205165C31D9b29C55a7B01F4911396306";
export const omniTokenAddress = "0x9e20461bc2c4c980f62f1B279D71734207a6A356";
export const kantoTokenAddress = "0x566a5BAb30cC8a62509eF0928A0fA4C97b0e873a";
export const baseV1RouterAddress = "0xa252eEE9BDe830Ca4793F054B506587027825a8e";
export const baseV1FactoryAddress =
  "0xE387067f12561e579C5f7d4294f51867E0c1cFba";
