import { useCallback, useEffect, useMemo, useState } from 'react'

import EastIcon from '@mui/icons-material/East'
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { formatUnits } from 'ethers/lib/utils'

import { CHAIN_ICONS } from 'assets/chains'
import NetworkAlert from 'components/NetworkAlert/NetworkAlert'
import { Chain, CHAIN_TO_CHAIN_ID, CHAIN_TO_CHAIN_NAME, SupportedChainId } from 'constants/chains'
import { DEFAULT_DECIMALS } from 'constants/tokens'
import useTokenBalance from 'hooks/useTokenBalance'
import { getUSDCContractAddress } from 'utils/addresses'

import type { Web3Provider } from '@ethersproject/providers'
import type { TransactionInputs } from 'contexts/AppContext'

import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/hooks'
import isCosmosAddress from 'utils/isCosmosAddress'
import { ethers } from 'ethers'

interface SelectItem {
  value: Chain
  label: string
  icon: string
}

const CHAIN_SELECT_ITEMS: SelectItem[] = [
  {
    value: Chain.NOBLE,
    label: 'Noble',
    icon: CHAIN_ICONS[Chain.NOBLE],
  },
  {
    value: Chain.ETH,
    label: CHAIN_TO_CHAIN_NAME[Chain.ETH],
    icon: CHAIN_ICONS[Chain.ETH],
  },
  {
    value: Chain.AVAX,
    label: CHAIN_TO_CHAIN_NAME[Chain.AVAX],
    icon: CHAIN_ICONS[Chain.AVAX],
  },
  {
    value: Chain.ARB,
    label: CHAIN_TO_CHAIN_NAME[Chain.ARB],
    icon: CHAIN_ICONS[Chain.ARB],
  },
]

export const DEFAULT_FORM_INPUTS: TransactionInputs = {
  source: Chain.ETH,
  target: Chain.NOBLE,
  address: '',
  amount: '',
}

interface Props {
  handleNext: () => void
  handleUpdateForm: React.Dispatch<React.SetStateAction<TransactionInputs>>
  formInputs: TransactionInputs
}

const SendForm = observer(({ handleNext, handleUpdateForm, formInputs }: Props) => {
  const { account, active, chainId } = useWeb3React<Web3Provider>()
  const USDC_ADDRESS = getUSDCContractAddress(chainId)

  const cosmosWalletStore = useStore('cosmosWalletStore')
  const chainStore = useStore('chainStore')

  const [walletUSDCBalance, setWalletUSDCBalance] = useState(0)
  const { source, target, address, amount } = formInputs
  const [isFormValid, setIsFormValid] = useState(false)
  const balance = useTokenBalance(USDC_ADDRESS, account ?? '')

  const updateFormIsValid = useCallback(() => {
    console.log({source, chainId})
    const isValid =
      source !== '' &&
      target !== '' &&
      source !== target &&
      address !== '' &&
      // address === account &&
      getAddressHelperText === '' &&
      amount !== '' &&
      !isNaN(+amount) &&
      +amount > 0 &&
      +amount <= walletUSDCBalance &&
      ( ( chainStore.fromChainType==='evm' && CHAIN_TO_CHAIN_ID[source] === chainId) // // this chainId if from useWeb3React, only suitable for EVM
        || ( chainStore.fromChainType==='cosmos' && CHAIN_TO_CHAIN_ID[source] === SupportedChainId.NOBLE )
      )
    setIsFormValid(isValid)
  }, [source, target, address, account, amount, walletUSDCBalance, chainId])

  useEffect(() => {
    if (account && active) { // evm wallet connected
      setWalletUSDCBalance(Number(formatUnits(balance, DEFAULT_DECIMALS)))
    } else if (cosmosWalletStore.address) { // keplr wallet connected
      // get cosmos wallet balance
      fetch(`https://lcd-noble.keplr.app/cosmos/bank/v1beta1/balances/${cosmosWalletStore.address}`)
      .then((response) => response.json()).then((data) => {
        const balance = data.balances.find((balance: any) => balance.denom === 'uusdc')
        setWalletUSDCBalance(Number(balance.amount)/10**6)
      })
    } else {
      setWalletUSDCBalance(0)
    }
  }, [account, active, balance, cosmosWalletStore.address])

  useEffect(updateFormIsValid, [updateFormIsValid])

  const renderChainMenuItem = (chain: SelectItem, disabledValue = '') => (
    <MenuItem
      key={chain.value}
      value={chain.value}
      disabled={chain.value === disabledValue}
    >
      <div className="flex items-center">
        <img className="ml-2 h-8" src={chain.icon} alt={chain.label} />
        <span className="ml-4">{chain.label}</span>
      </div>
    </MenuItem>
  )

  const getAddressHelperText = useMemo(() => {
    if (address==='') return ''
    if ( address !== '' // means receiver address is entered
      && (
        ((!account || !active) && chainStore.fromChainType!=='cosmos') 
        || (
          !cosmosWalletStore.address // means cosmos wallet is not connected
          && chainStore.fromChainType==='cosmos'
        )
      )
    ) {
      // return 'Please connect your wallet and check your selected network'
    }
    if (address !== '' && address !== account) {
      // return "Destination address doesn't match active wallet address"
    }
    if (chainStore.toChainType==='cosmos' && !isCosmosAddress({address, prefix: 'noble'})) {
      return 'Invalid Noble address'
    }
    if (chainStore.toChainType==='evm' && !ethers.utils.isAddress(address)) {
      return 'Invalid Ethereum address'
    }
    return ''
  }, [address, account, active, cosmosWalletStore.address, chainStore.fromChainType])

  const getAmountHelperText = useMemo(() => {
    console.log({amount, walletUSDCBalance})
    const balanceAvailable = `${walletUSDCBalance.toLocaleString()} available`
    if (amount !== '' && (isNaN(+amount) || +amount <= 0)) {
      return `Enter a valid amount, ${balanceAvailable}`
    }
    if (amount !== '' && +amount > walletUSDCBalance) {
      return `Cannot exceed wallet balance, ${balanceAvailable}`
    }
    return balanceAvailable
  }, [amount, walletUSDCBalance])

  const handleSourceChange = (value: string) => {
    // if (value === Chain.NOBLE) return
    console.log('handleSourceChange value', value)
    handleUpdateForm((state) => ({
      ...state,
      source: value,
      ...(target === value
        ? { target: Object.values(Chain).find((chain) => chain !== value) }
        : {}),
    }))
  }

  const handleAddMax = () => {
    handleUpdateForm((state) => ({
      ...state,
      amount: walletUSDCBalance.toString(),
    }))
  }

  const handleCopyFromWallet = () => {
    if (target === Chain.NOBLE) return
    handleUpdateForm((state) => ({
      ...state,
      address: account ?? '',
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleNext()
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <NetworkAlert className="-mt-20 mb-8" chain={formInputs.source} />

      <div className="-mx-6 flex items-center justify-between">
        <FormControl className="mx-6" fullWidth>
          <InputLabel id="source">Source</InputLabel>
          <Select
            id="source"
            label="Source"
            error={
              account !== null &&
              active &&
              CHAIN_TO_CHAIN_ID[source] !== chainId
            }
            value={source}
            onChange={(event) => handleSourceChange(event.target.value)}
          >
            {CHAIN_SELECT_ITEMS.map((chain) => {
              // if (chain.value === Chain.NOBLE) return null
              return renderChainMenuItem(chain)
            })}
          </Select>
        </FormControl>

        <EastIcon className="text-gumdrop-200" sx={{ fontSize: 40 }} />

        <FormControl className="mx-6" fullWidth>
          <InputLabel id="target">Destination</InputLabel>
          <Select
            id="target"
            label="Destination"
            value={target}
            onChange={(event) =>
              handleUpdateForm((state) => ({
                ...state,
                target: event.target.value,
              }))
            }
          >
            {CHAIN_SELECT_ITEMS.map((chain) => {
              // if (chain.value !== Chain.NOBLE) return null
              return renderChainMenuItem(chain, source)
            })}
          </Select>
        </FormControl>
      </div>

      <FormControl className="mt-12" fullWidth>
        <TextField
          id="address"
          label="Destination Address"
          variant="outlined"
          value={address}
          error={!!getAddressHelperText}
          helperText={getAddressHelperText}
          onChange={(event) =>
            handleUpdateForm((state) => ({
              ...state,
              address: event.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <Button
          //         color="secondary"
          //         onClick={handleCopyFromWallet}
          //         disabled={!account || !active}
          //       >
          //         COPY FROM WALLET
          //       </Button>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </FormControl>

      <FormControl className="mt-6" fullWidth>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          type="number"
          error={
            amount !== '' &&
            (isNaN(+amount) || +amount <= 0 || +amount > walletUSDCBalance)
          }
          helperText={getAmountHelperText}
          value={amount}
          onChange={(event) =>
            handleUpdateForm((state) => ({
              ...state,
              amount: event.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="secondary"
                  onClick={handleAddMax}
                  disabled={walletUSDCBalance === 0}
                >
                  ADD MAX
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <Button
        className="mt-12"
        type="submit"
        size="large"
        disabled={!isFormValid}
      >
        NEXT
      </Button>
    </form>
  )
})

export default SendForm
