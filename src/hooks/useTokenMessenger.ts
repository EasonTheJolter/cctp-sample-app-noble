import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'
import { type BigNumber, ethers } from 'ethers'

import { TokenMessenger__factory } from 'typechain/index'
import { addressToBytes32 } from 'utils'
import { getTokenMessengerContractAddress } from 'utils/addresses'

import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { DestinationDomain, SupportedChainId } from 'constants/chains'

const { bech32 } = require('bech32')

/**
 * Returns a list of methods to call the Token Messenger contract
 * @param chainId the ID of the current connected chain/network
 */
const useTokenMessenger = (chainId: SupportedChainId | undefined) => {
  const { library } = useWeb3React<Web3Provider>()

  const TOKEN_MESSENGER_CONTRACT_ADDRESS =
    getTokenMessengerContractAddress(chainId)

  /**
   * Returns transaction response from contract call
   * @param amount the amount to be deposit for burn on source chain
   * @param destinationDomain the Circle defined ID of target chain
   * @param mintRecipient the recipient address on target chain
   * @param burnToken the address of token to burn
   */
  const depositForBurn = useCallback(
    async (
      amount: BigNumber,
      destinationDomain: DestinationDomain,
      mintRecipient: string,
      burnToken: string
    ) => {
      if (!library) return
      const contract = TokenMessenger__factory.connect(
        TOKEN_MESSENGER_CONTRACT_ADDRESS,
        library.getSigner()
      )

      console.log('depositForBurn', {
        amount,
        destinationDomain, // 4
        mintRecipient, // noble1k74p0mrdm2a94u7kqpcrfv5lxwnd5wh6uruqln
        burnToken,
      })

      let _mintRecipient = addressToBytes32(mintRecipient)
      if (mintRecipient.startsWith('noble')) {
        const numberArray = bech32.fromWords(bech32.decode(mintRecipient).words)
        const mintRecipientBytes = new Uint8Array(32)
        mintRecipientBytes.set(numberArray, 32 - numberArray.length)
        _mintRecipient = ethers.utils.hexlify(mintRecipientBytes)
      }

      return await contract
        .depositForBurn(amount, destinationDomain, _mintRecipient, burnToken)
        .then((response: TransactionResponse) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [TOKEN_MESSENGER_CONTRACT_ADDRESS, library]
  )

  return {
    depositForBurn,
  }
}

export default useTokenMessenger
