import { action, makeObservable, observable } from 'mobx'
import { CctpMoneyFees } from 'types/cctp.money'

export default class CctpMoneyStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  cctpMoneyFees: CctpMoneyFees|null = null
  @action
  setCctpMoneyFees(cctpMoneyFees: CctpMoneyFees) {
    this.cctpMoneyFees = cctpMoneyFees
  }
}