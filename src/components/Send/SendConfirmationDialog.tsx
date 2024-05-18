import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from 'ethers/lib/utils'

import NetworkAlert from 'components/NetworkAlert/NetworkAlert'
import TransactionDetails from 'components/TransactionDetails/TransactionDetails'
import { CHAIN_TO_CHAIN_ID, CHAIN_TO_CHAIN_NAME, DestinationDomain, SupportedChainId } from 'constants/chains'
import { DEFAULT_DECIMALS } from 'constants/tokens'
import {
  TransactionStatus,
  TransactionType,
  useTransactionContext,
} from 'contexts/AppContext'
import useTokenAllowance from 'hooks/useTokenAllowance'
import useTokenApproval from 'hooks/useTokenApproval'
import useTokenMessenger from 'hooks/useTokenMessenger'
import { useTransactionPolling } from 'hooks/useTransactionPolling'
import {
  getTokenMessengerContractAddress,
  getUSDCContractAddress,
} from 'utils/addresses'

import type { Web3Provider } from '@ethersproject/providers'
import type { SxProps } from '@mui/material'
import type { Chain } from 'constants/chains'
import type { TransactionInputs } from 'contexts/AppContext'
import { type BigNumber } from 'ethers'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/hooks'

import {circle, cosmos, getSigningCircleClient} from '../../codegen'
import { SigningStargateClient } from '@cosmjs/stargate'
import { Keplr } from '@keplr-wallet/types'
import { OfflineSigner, Registry } from '@cosmjs/proto-signing'
import { MsgDepositForBurn } from 'generated/tx'

interface Props {
  handleClose: () => void
  handleNext: (hash: string) => void
  open: boolean
  formInputs: TransactionInputs
  sx?: SxProps
}

const SendConfirmationDialog: React.FC<Props> = observer(({
  handleClose,
  handleNext,
  open,
  formInputs,
  sx = {},
}) => {
  const { account, active, chainId } = useWeb3React<Web3Provider>()
  const { target, address, amount } = formInputs
  const [isAllowanceSufficient, setIsAllowanceSufficient] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const chainStore = useStore('chainStore')
  const cosmosWalletStore = useStore('cosmosWalletStore')
  const cctpMoneyStore = useStore('cctpMoneyStore')

  const USDC_ADDRESS = getUSDCContractAddress(chainId)
  const TOKEN_MESSENGER_ADDRESS = getTokenMessengerContractAddress(chainId)

  const { approve } = useTokenApproval(USDC_ADDRESS, TOKEN_MESSENGER_ADDRESS)
  const { depositForBurn } = useTokenMessenger(chainId)
  const allowance = useTokenAllowance(
    USDC_ADDRESS,
    account ?? '',
    TOKEN_MESSENGER_ADDRESS
  )
  const { addTransaction } = useTransactionContext()

  useEffect(() => {
    if (!account || !active || !amount) return

    // amount <= allowance, sufficient
    setIsAllowanceSufficient(
      parseUnits(amount ?? '0', DEFAULT_DECIMALS).lte(allowance)
    )
  }, [account, active, allowance, amount])

  const handleApproveComplete = () => {
    setIsApproving(false)
    setIsAllowanceSufficient(true)
  }

  const { handleApproveAllowanceTransactionPolling } = useTransactionPolling(
    handleApproveComplete
  )

  const handleApprove = async () => {
    const amountToApprove: BigNumber = parseUnits(
      amount.toString(),
      DEFAULT_DECIMALS
    )
    if (amountToApprove.gt(0)) {
      setIsApproving(true)
      try {
        const response = await approve(amountToApprove)
        if (!response) return

        const { hash } = response.response
        return handleApproveAllowanceTransactionPolling(hash)
      } catch (err) {
        console.error(err)
        setIsApproving(false)
      }
    }
  }

  const handleSend = async ({clientType}:{
    clientType: 'telescope'|'cctp-example'
  }) => {
    
    const amountToSend: BigNumber = parseUnits(
      amount.toString(),
      DEFAULT_DECIMALS
    )

    setIsSending(true)

    if (chainStore.fromChainType === 'cosmos') {
      const keplr:Keplr = (window as any).keplr
      if (!cosmosWalletStore.address) return
      const {depositForBurn} = circle.cctp.v1.MessageComposer.withTypeUrl
      const {send} = cosmos.bank.v1beta1.MessageComposer.withTypeUrl

      const from = cosmosWalletStore.address

      const cleanedMintRecipient = address.replace(/^0x/, '');
      const zeroesNeeded = 64 - cleanedMintRecipient.length;
      const mintRecipient = '0'.repeat(zeroesNeeded) + cleanedMintRecipient;
      const buffer = Buffer.from(mintRecipient, "hex");
      const mintRecipientBytes = new Uint8Array(buffer)

      const msg = depositForBurn({
        from,
        amount: amountToSend.toString(),
        destinationDomain: DestinationDomain[target as Chain], 
        mintRecipient: mintRecipientBytes,
        burnToken: 'uusdc',
      })

      const fees = cctpMoneyStore.cctpMoneyFees.data
      let feeAmount = ''
      let arriveTime = 'minutes'
      for (const index in fees) {
        if (Object.prototype.hasOwnProperty.call(fees, index)) {
          const fee = fees[index]
          if (fee.name === CHAIN_TO_CHAIN_NAME[formInputs?.target as string]) {
            feeAmount = fee.fee.fixed.toString()
            arriveTime = fee.time
          }
        }
      }
      const msgFee = send({
        fromAddress: from,
        toAddress: 'noble18jdmatzr72mktgc4ky0j3pnvue34ky4vtu4us6',
        amount: [{denom: 'uusdc', amount: feeAmount}]
      })
      
      const rpcEndpoint = 'https://rpc.mainnet.noble.strange.love'
      let client: SigningStargateClient
      try {
        const signer = await keplr.getOfflineSignerAuto(SupportedChainId.NOBLE) as OfflineSigner
        if (clientType==='telescope') {
          client = await getSigningCircleClient({rpcEndpoint, signer})
        } else {
          client = await SigningStargateClient.connectWithSigner(
            rpcEndpoint,
            signer,
            {
              registry: new Registry([
                ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
              ])
            }
          )
        }
      } catch(error) {
        setIsSending(false)
        alert(error.message ?? error.toString())
        return
      }
      let fee = {amount: [{amount: '0', denom: 'uusdc'}], gas: '200000'}
      console.log({from, msgFee, msg})
      try {
        fee = {amount: [{amount: '0', denom: 'uusdc'}], gas:((await client.simulate(from, [msgFee, msg],''))*Number(2)).toString()}
      } catch(error) {
        console.error('simulate error', error)
        setIsSending(false)
        alert(error.message ?? error.toString())
        return
      }
      console.log('simulate fee', fee)
      client.signAndBroadcast(from, [msgFee, msg], fee).then(res=>{
        if (res.code === 0) {
          if (confirm(`Transaction submited. It might take ${arriveTime} for the USDCs to arrive target chain. Do you want to check the transaction on noble chain?`)) {
            window.open(`https://www.mintscan.io/noble/tx/${res.transactionHash}`)
          } else {
            alert(res.rawLog ?? res.toString())
          }
        }
      }).catch(error=>{
        console.error('signAndBroadcast error', error)
        alert(error.message ?? error.toString())
      }).finally(()=>{
        setIsSending(false)
      })
      return
    }

    try {
      const response = await depositForBurn(
        amountToSend,
        DestinationDomain[target as Chain],
        address,
        USDC_ADDRESS
      )
      if (!response) return

      const { hash } = response

      const transaction = {
        ...formInputs,
        hash,
        type: TransactionType.SEND,
        status: TransactionStatus.PENDING,
      }

      addTransaction(hash, transaction)

      handleNext(hash)
      setIsSending(false)
    } catch (err) {
      console.error(err)
      setIsSending(false)
    }
  }

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      onClose={handleClose}
      open={open}
      sx={sx}
    >
      <DialogTitle>Approve and send transfer</DialogTitle>
      <DialogContentText className="mx-12">
        Confirm that you want to send the following amount of USDC from the
        source address to the destination address shown below.
      </DialogContentText>
      <DialogContent>
        <TransactionDetails transaction={formInputs} />

        <NetworkAlert className="mt-8" chain={formInputs.source} />
      </DialogContent>

      <DialogActions className="mt-8">
        <Button size="large" color="secondary" onClick={handleClose}>
          BACK
        </Button>
        {( chainStore.fromChainType==='evm' && !isAllowanceSufficient) ? (
          <LoadingButton
            size="large"
            onClick={handleApprove}
            disabled={
              isApproving || CHAIN_TO_CHAIN_ID[formInputs.source] !== chainId
            }
            loading={isApproving}
          >
            APPROVE
          </LoadingButton>
        ) : (
          <>
            <LoadingButton
              size="large"
              onClick={()=>handleSend({clientType:'telescope'})}
              disabled={
                isSending || ( 
                  (chainStore.fromChainType==='evm' && CHAIN_TO_CHAIN_ID[formInputs.source] !== chainId) // chainId is from evm wallet
                  || (chainStore.fromChainType==='cosmos' && CHAIN_TO_CHAIN_ID[formInputs.source] !== SupportedChainId.NOBLE)
                )
              }
              loading={isSending}
            >
              SEND{chainStore.fromChainType==='cosmos'&&` by telescope`}
            </LoadingButton>
            {chainStore.fromChainType==='cosmos'&&<LoadingButton
              size="large"
              onClick={()=>handleSend({clientType:'cctp-example'})}
              disabled={
                isSending || ( 
                  (chainStore.fromChainType==='cosmos' && CHAIN_TO_CHAIN_ID[formInputs.source] !== SupportedChainId.NOBLE)
                )
              }
              loading={isSending}
            >
              SEND by cctp-example
            </LoadingButton>}
          </>
        )}
      </DialogActions>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
})

export default SendConfirmationDialog
