import { bech32 } from "bech32";
// only suitable for 118 type address
export default function cosmosAddrConvertor(oldAddress: string, newHrp: string): string {
  const { words } = bech32.decode(oldAddress);
  return bech32.encode(newHrp, words);
}