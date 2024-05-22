import { action, makeObservable, observable } from 'mobx'

type CctpParam = {
  minter: string,
  targetChains: {
    chainName: string,
    fee: string, // uusdc in noble
    time: string,
    domain: number // https://developers.circle.com/stablecoins/docs/supported-domains
  }[]
}

export default class CctpParamStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  cctpParam: CctpParam|null = null
  @action
  setCctpParam(cctpParam: CctpParam) {
    this.cctpParam = cctpParam
  }
}