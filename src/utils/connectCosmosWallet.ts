import type { Keplr } from '@keplr-wallet/types'

const connectCosmosWallet = async () => {
  const chainId = 'noble-1'
  const keplr: Keplr = (window as any).keplr

  if (typeof keplr === 'undefined') {
    return new Error('Keplr extension not installed')
  }
  if (keplr.experimentalSuggestChain === undefined) {
    return new Error('Please use Keplr extension version 0.6.2 or higher')
  }
  await keplr.enable(chainId)
  const offlineSigner = keplr.getOfflineSigner(chainId)
  const accounts = await offlineSigner.getAccounts()
  return accounts?.[0].address
}

export default connectCosmosWallet
