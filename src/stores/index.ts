import React from 'react'

import CosmosWalletStore from './CosmosWalletStore'
import ChainStore from './ChainStore'
import CctpMoneyStore from './CctpMoneyStore'

export const stores = Object.freeze({
  cosmosWalletStore: new CosmosWalletStore(),
  chainStore: new ChainStore(),
  cctpMoneyStore: new CctpMoneyStore(),
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
