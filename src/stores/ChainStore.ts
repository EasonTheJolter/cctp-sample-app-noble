import { action, makeObservable, observable } from 'mobx'

type ChainType = 'evm'|'cosmos'

export default class ChainStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  fromChainType: ChainType = 'evm'

  @action
  setFromChainType(fromChainType: ChainType) {
    this.fromChainType = fromChainType
  }
}