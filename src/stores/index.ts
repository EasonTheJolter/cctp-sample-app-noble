import React from 'react'

import CosmosWalletStore from './CosmosWalletStore'

export const stores = Object.freeze({
  cosmosWalletStore: new CosmosWalletStore(),
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
