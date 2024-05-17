import React from 'react'

import { storesContext } from './'

import type { stores } from './'

export const useStores = () => React.useContext(storesContext)

export const useStore = <T extends keyof typeof stores>(
  store: T
): (typeof stores)[T] => React.useContext(storesContext)[store]
