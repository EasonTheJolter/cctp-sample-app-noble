import React from 'react'

import CosmosWalletStore from './CosmosWalletStore'
import ChainStore from './ChainStore'

export const stores = Object.freeze({
  cosmosWalletStore: new CosmosWalletStore(),
  chainStore: new ChainStore()
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
