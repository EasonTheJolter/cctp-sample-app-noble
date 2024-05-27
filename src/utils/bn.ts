import BigNumber from "bignumber.js";

export default function bn(value: BigNumber.Value) {
  return new BigNumber(value)
}