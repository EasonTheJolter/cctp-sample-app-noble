/**
 * List of all the chains/networks supported
 */
export enum Chain {
  ETH = 'ETH',
  AVAX = 'AVAX',
  ARB = 'ARB',
  NOBLE = 'NOBLE',
}

/**
 * List of all the chain/network IDs supported
 */
export enum SupportedChainId {
  // ETH_SEPOLIA = 11155111,
  // AVAX_FUJI = 43113,
  // ARB_SEPOLIA = 421614,
  NOBLE = 'noble-1',
  ETH = 1,
  AVAX = 43114,
  ARB = 42161,
}

/**
 * List of all the chain/network IDs supported in hexadecimals
 * TODO: Infer from SupportedChainId
 */
export const SupportedChainIdHex = {
  // ETH_SEPOLIA: '0xaa36a7',
  // AVAX_FUJI: '0xa869',
  // ARB_SEPOLIA: '0x66eee',
  NOBLE: 'noble-1',
  ETH: '0x1',
  AVAX: '0xa86a',
  ARB: '0xa61',
}

interface ChainToChainIdMap {
  [key: string]: number | string
}

/**
 * Maps a chain to it's chain ID
 */

export const CHAIN_TO_CHAIN_ID: ChainToChainIdMap = {
  // [Chain.ETH]: SupportedChainId.ETH_SEPOLIA,
  // [Chain.AVAX]: SupportedChainId.AVAX_FUJI,
  // [Chain.ARB]: SupportedChainId.ARB_SEPOLIA,
  [Chain.ETH]: SupportedChainId.ETH,
  [Chain.AVAX]: SupportedChainId.AVAX,
  [Chain.ARB]: SupportedChainId.ARB,
}

interface ChainToChainNameMap {
  [key: string]: string
}

/**
 * Maps a chain to it's readable name
 */
export const CHAIN_TO_CHAIN_NAME: ChainToChainNameMap = {
  ETH: 'Ethereum',
  AVAX: 'Avalanche',
  ARB: 'Arbitrum',
  NOBLE: 'Noble',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === 'number') as SupportedChainId[]

/**
 * List of Circle-defined IDs referring to specific domains
 */
export enum DestinationDomain {
  ETH = 0,
  AVAX = 1,
  ARB = 3,
  NOBLE = 4, // noble domain: https://developers.circle.com/stablecoins/docs/noble-cosmos-module#testnet-and-mainnet-module-address
}

// https://eips.ethereum.org/EIPS/eip-3085
interface AddEthereumChainParameter {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}

const ETH_SEPOLIA: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.ETH_SEPOLIA,
  chainId: SupportedChainIdHex.ETH,
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
}

const AVAX_FUJI: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.AVAX_FUJI,
  chainId: SupportedChainIdHex.AVAX,
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
}

const ARB_SEPOLIA: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.ARB_SEPOLIA,
  chainId: SupportedChainIdHex.ARB,
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  chainName: 'Arbitrum Sepolia Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://arb-sepolia.g.alchemy.com/v2/demo'],
}

const ETH: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.ETH_SEPOLIA,
  chainId: SupportedChainIdHex.ETH,
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
}

const AVAX: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.AVAX_FUJI,
  chainId: SupportedChainIdHex.AVAX,
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
}

const ARB: AddEthereumChainParameter = {
  // chainId: SupportedChainIdHex.ARB_SEPOLIA,
  chainId: SupportedChainIdHex.ARB,
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  chainName: 'Arbitrum Sepolia Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://arb-sepolia.g.alchemy.com/v2/demo'],
}

interface ChainIdToChainParameters {
  [key: string]: AddEthereumChainParameter
}

export const CHAIN_ID_HEXES_TO_PARAMETERS: ChainIdToChainParameters = {
  [SupportedChainIdHex.ETH]: ETH,
  [SupportedChainIdHex.AVAX]: AVAX,
  [SupportedChainIdHex.ARB]: ARB,
}
