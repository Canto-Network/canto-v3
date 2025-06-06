export const CROCCOLDPATH_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "authority",
          "type": "address"
        }
      ],
      "name": "AuthorityTransfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tick",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "pivotTime",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "feeMileage",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint160",
          "name": "commitEntropy",
          "type": "uint160"
        }
      ],
      "name": "CrocKnockoutCross",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolIdx",
          "type": "uint256"
        }
      ],
      "name": "DisablePoolTemplate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "name": "HotPathOpen",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "base",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "quote",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolIdx",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "price",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "liq",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "int128",
          "name": "baseFlow",
          "type": "int128"
        },
        {
          "indexed": false,
          "internalType": "int128",
          "name": "quoteFlow",
          "type": "int128"
        }
      ],
      "name": "InitPool",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "base",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "quote",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolIdx",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "feeRate",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "tickSize",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "jitThresh",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "knockout",
          "type": "uint8"
        }
      ],
      "name": "PoolRevision",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "unitTickCollateral",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "awayTickTol",
          "type": "uint16"
        }
      ],
      "name": "PriceImproveThresh",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recv",
          "type": "address"
        }
      ],
      "name": "ProtocolDividend",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "base",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "quote",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolIdx",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "takeRate",
          "type": "uint8"
        }
      ],
      "name": "ResyncTakeRate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "name": "SafeMode",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "liq",
          "type": "uint128"
        }
      ],
      "name": "SetNewPoolLiq",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolIdx",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "feeRate",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "tickSize",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "jitThresh",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "knockout",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "oracleFlags",
          "type": "uint8"
        }
      ],
      "name": "SetPoolTemplate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "takeRate",
          "type": "uint8"
        }
      ],
      "name": "SetRelayerTakeRate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "takeRate",
          "type": "uint8"
        }
      ],
      "name": "SetTakeRate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "int128",
          "name": "delta",
          "type": "int128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "fromSurplus",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "toSurplus",
          "type": "uint128"
        }
      ],
      "name": "Surplus",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "treasury",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint64",
          "name": "startTime",
          "type": "uint64"
        }
      ],
      "name": "TreasurySet",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint16",
          "name": "slot",
          "type": "uint16"
        }
      ],
      "name": "acceptCrocProxyRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "authority",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentivePoolAmbLiqAddedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentivePoolAmbLiqRemovedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentivePoolConcLiqAddedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentivePoolConcLiqRemovedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentivePoolFeeAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentiveUserPoolAmbLiqAddedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentiveUserPoolAmbLiqRemovedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentiveUserPoolConcLiqAddedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentiveUserPoolConcLiqRemovedAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "pool",
          "type": "bytes32"
        }
      ],
      "name": "incentiveUserPoolFeeAccumulators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "cmd",
          "type": "bytes"
        }
      ],
      "name": "protocolCmd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "safeMode",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "cmd",
          "type": "bytes"
        }
      ],
      "name": "userCmd",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ] as const;
