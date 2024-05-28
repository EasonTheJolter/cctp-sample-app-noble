import cosmosAddrConvertor from "./cosmosAddrConvertor"

const watchCosmosTokenChange = ({
  denom,
  address,
  timeoutSecond = 300, // second
  direction='inc'
}:{
  denom: string,
  address: string,
  timeoutSecond?: number, // seconds
  direction?: 'inc'|'desc'
}): Promise<{newBalance: string}> => {
  const fetchUrl = `https://lcd-noble.keplr.app/cosmos/bank/v1beta1/balances/${cosmosAddrConvertor(address, 'noble')}`
  return new Promise(async (resolve, reject) => {
    let oldAmount = '0'
    try {
      oldAmount = (await (await fetch(fetchUrl)).json()).balances?.find((b: any) => b.denom === denom)?.amount ?? '0'
    } catch(err) {
      reject(err)
      return
    }
    let counter = 0
    const invervalTime = 6000 // ms
    const intervalId = setInterval(async () => {
      counter ++
      if ( counter*invervalTime > timeoutSecond*1000) {
        clearInterval(intervalId)
        reject({message: `timeout ${timeoutSecond}s`})
      }
      try {
        const newAmount = (await (await fetch(fetchUrl)).json()).balances?.find((b: any) => b.denom === denom)?.amount ?? '0'
        if (
          (direction==='inc' && Number(newAmount) > Number(oldAmount))
          || (direction==='desc' && Number(newAmount) < Number(oldAmount))
        ) {
          clearInterval(intervalId)
          resolve({newBalance: newAmount})
        }
      } catch(err) {
        reject(err)
      }
    }, invervalTime)
  })
}

export default watchCosmosTokenChange;