export const CROCWARMPATH_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liq",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
    ],
    name: "BurnAmbient",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liq",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "bidTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "askTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "rewardFees",
        type: "uint128",
      },
    ],
    name: "BurnRanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isBid",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "pivotTime",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "feeMileage",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint160",
        name: "commitEntropy",
        type: "uint160",
      },
    ],
    name: "CrocKnockoutCross",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "bidTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "askTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "rewardFees",
        type: "uint128",
      },
    ],
    name: "Harvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liq",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
    ],
    name: "MintAmbient",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liq",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "bidTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "askTick",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
    ],
    name: "MintRanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "slot",
        type: "uint16",
      },
    ],
    name: "acceptCrocProxyRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentivePoolAmbLiqAddedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentivePoolAmbLiqRemovedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentivePoolConcLiqAddedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentivePoolConcLiqRemovedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentivePoolFeeAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentiveUserPoolAmbLiqAddedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentiveUserPoolAmbLiqRemovedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentiveUserPoolConcLiqAddedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentiveUserPoolConcLiqRemovedAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "pool",
        type: "bytes32",
      },
    ],
    name: "incentiveUserPoolFeeAccumulators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "safeMode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "userCmd",
    outputs: [
      {
        internalType: "int128",
        name: "baseFlow",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "quoteFlow",
        type: "int128",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
