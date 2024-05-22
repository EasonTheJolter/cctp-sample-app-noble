import React from 'react'

import CosmosWalletStore from './CosmosWalletStore'
import ChainStore from './ChainStore'
import CctpMoneyStore from './CctpMoneyStore'
import CctpParamStore from './CctpParamStore'

export const stores = Object.freeze({
  cosmosWalletStore: new CosmosWalletStore(),
  chainStore: new ChainStore(),
  cctpMoneyStore: new CctpMoneyStore(),
  cctpParamStore: new CctpParamStore()
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
