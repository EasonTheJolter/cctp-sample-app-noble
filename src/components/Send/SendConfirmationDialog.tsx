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
import { BigNumber } from 'ethers'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/hooks'

import {circle, cosmos, getSigningCircleClient} from '../../codegen'
import { MsgTransferEncodeObject, SigningStargateClient } from '@cosmjs/stargate'
import { Keplr } from '@keplr-wallet/types'
import { OfflineSigner, Registry } from '@cosmjs/proto-signing'
import { MsgDepositForBurn } from 'generated/tx'
import { error } from 'console'
import watchCosmosTokenChange from 'utils/watchCosmosTokenChange'
import Long from "long"
import bn from 'utils/bn'
import {Decimal} from '@cosmjs/math'

interface Props {
  handleClose: () => void
  handleNext: (hash: string) => void
  open: boolean
  formInputs: TransactionInputs
  sx?: SxProps
}

const rpcEndpoint = 'https://rpc.mainnet.noble.strange.love'

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
  const [nobleChainReceived, setNobleChainReceived] = useState(false)
  const [isSendingIBC, setIsSendingIBC] = useState(false)

  const chainStore = useStore('chainStore')
  const cosmosWalletStore = useStore('cosmosWalletStore')
  const cctpParamStore = useStore('cctpParamStore')
  const [nobleBalance, setNobleBalance] = useState('0')

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

      let feeAmount = ''
      let arriveTime = 'minutes'
      for (const item of cctpParamStore.cctpParam?.targetChains||[]) {
        if (item.chainName === CHAIN_TO_CHAIN_NAME[formInputs?.target as string]) {
          feeAmount = item.fee
          arriveTime = item.time
        }
      }
      const msgFee = send({
        fromAddress: from,
        toAddress: cctpParamStore.cctpParam?.minter, // get from backend
        amount: [{denom: 'uusdc', amount: feeAmount}]
      })
    
      let client: SigningStargateClient
      try {
        const signer = await keplr.getOfflineSignerAuto(SupportedChainId.NOBLE) as OfflineSigner
        client = await getSigningCircleClient({rpcEndpoint, signer}) // only use telescope, cctp-example is support sendToken msg
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
        if (res.code !== 0) {
          console.error('signAndBroadcast error', res)
          alert(res.rawLog ?? res.toString())
          return
        }
        if (res.code === 0) {
          let counter = 0
          const interval = setInterval(async () => {
            counter++
            if (counter>20) {
              clearInterval(interval)
              if(confirm(`Token send but not arrived yet. Please view on noble chain explorer`)) {
                window.open(`https://www.mintscan.io/noble/tx/${res.transactionHash}`)
              }
              handleClose()
              setIsSending(false)
            }
            fetch(`https://iris-api.circle.com/v1/messages/4/${res.transactionHash}`)
            .then(res=>res.json()).then(({messages})=>{

              // 404 will also return here
              // 200 attestation might be PENDING
              if (!messages || messages[0]?.attestation==='PENDING') return

              clearInterval(interval)
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mint-on-evm`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  messages,
                  transactionHash: res.transactionHash,
                })
              }).then(res=>res.json()).then((res)=>{
                if (res.status!==1) {
                  alert(res.error ?? res.message ?? res.toString())
                  return
                }
                alert('Token received on destination chain! 🎉')
              }).catch(error=>{
                alert(error.message ?? error.toString())
              }).finally(()=>{
                handleClose()
                setIsSending(false)
              })
            })
          }, 20000)
        }
      }).catch(error=>{
        setIsSending(false)
        console.error('signAndBroadcast error', error)
        alert(error.message ?? error.toString())
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

      if (chainStore.toChainType === 'cosmos') {
        getAttestationAndCheckNobleReceived({address, hash})
        return
      }

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

  const getAttestationAndCheckNobleReceived = ({
    address, hash
  }:{
    address: string,
    hash: string
  }) =>{
    watchCosmosTokenChange({
      denom: 'uusdc',
      address,
      timeoutSecond: 99999
    }).then(({newBalance})=>{
      setIsSending(false)
      setNobleChainReceived(true)
      setNobleBalance(newBalance)
    })
  }

  const handleSendIBC = async () => {
    const keplr = (window as any).keplr as Keplr
    const signerJolt = keplr.getOfflineSignerOnlyAmino('joltify_1729-1')
    let receiver: string
    setIsSendingIBC(true)
    try {
      receiver = (await signerJolt.getAccounts())[0].address
    } catch(error) {
      setIsSendingIBC(false)
      alert(error.message ?? error.toString())
      return
    }

    let tokenAmount = bn(amount).times(10**6)
    if (bn(nobleBalance).minus(tokenAmount).lt(50000)) {
      tokenAmount = bn(nobleBalance).minus(50000)
      return
    }

    const msg:MsgTransferEncodeObject = {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sourcePort: "transfer",
        sourceChannel: 'channel-81',
        token: {denom: 'uusdc', amount: tokenAmount.toFixed(0) },
        sender: address, 
        receiver, // get jolt addr from keplr ,
        timeoutTimestamp: BigInt((new Date().getTime()+10*60*1000)*1000000), // Long.fromNumber((new Date().getTime()+10*60*1000)*1000000),
        memo: ''
      }
    }
    
    let client: SigningStargateClient
    try {
      const signer = keplr.getOfflineSignerOnlyAmino(SupportedChainId.NOBLE)
      client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {gasPrice: {amount: Decimal.fromUserInput('4000', 0), denom: 'uusdc'}})
    } catch(error) {
      setIsSendingIBC(false)
      alert(error.message ?? error.toString())
      return
    }
    let fee = {amount: [{amount: '0', denom: 'uusdc'}], gas: '200000'}
    try {
      fee = {amount: [{amount: '0', denom: 'uusdc'}], gas:((await client.simulate(address, [msg],''))*Number(2)).toString()}
    } catch(error) {
      console.error('simulate error', error)
      setIsSendingIBC(false)
      alert(error.message ?? error.toString())
      return
    }
    
    client.signAndBroadcast(address, [msg], fee).then(res=>{
      if (res.code===0) {
        setTimeout(()=>{
          setIsSendingIBC(false)
          handleClose()
          if (confirm(`Token sent to Joltify! 🎉`)) {
            window.open(`https://explorer.joltify.io/joltify/accounts/${receiver}`)
          }
        }, 10000)
        return
      }
      setIsSendingIBC(false)
      alert(res.rawLog ?? res.toString())
    }).catch(error=>{
      setIsSendingIBC(false)
      alert(error.message ?? error.toString())
    })
    
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
        {chainStore.toChainType==='evm'&&<Button size="large" color="secondary" onClick={handleClose}>
          BACK
        </Button>}
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
                nobleChainReceived ||
                isSending || ( 
                  (chainStore.fromChainType==='evm' && CHAIN_TO_CHAIN_ID[formInputs.source] !== chainId) // chainId is from evm wallet
                  || (chainStore.fromChainType==='cosmos' && CHAIN_TO_CHAIN_ID[formInputs.source] !== SupportedChainId.NOBLE)
                )
              }
              loading={isSending}
            >
              {chainStore.toChainType==='cosmos'&&'1. '}SEND{chainStore.toChainType==='cosmos'&&' to Noble'}
            </LoadingButton>

            {chainStore.toChainType==='cosmos' &&
              <>
                <div>{'->'}</div>
                <div style={{color: nobleChainReceived?undefined:'grey'}}>
                  2. Received On Noble
                </div>
                <div>{'->'}</div>
                <LoadingButton
                  size="large"
                  onClick={handleSendIBC}
                  disabled={!nobleChainReceived||isSendingIBC}
                  loading={isSendingIBC}
                >
                  3. IBC to Joltify
                </LoadingButton>
              </>
            }
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
