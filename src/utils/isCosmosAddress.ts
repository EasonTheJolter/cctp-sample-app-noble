import { normalizeBech32 } from '@cosmjs/encoding'

export default function isCosmosAddress({address, prefix}: {
  address: string,
  prefix: string
}): boolean {
  try {
    normalizeBech32(address)
    return address.startsWith(prefix)
  } catch(e) {
    return false
  }
}