import { createRouter, defineEventHandler, useBase } from 'h3'
import axios from 'axios'
const router = createRouter()
const config = useRuntimeConfig()
const serverEnv = config.apiSecret

const generateDate = () => {
  const dateTime = new Date()
  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, '0')
  const day = String(dateTime.getDate()).padStart(2, '0')
  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')
  const seconds = String(dateTime.getSeconds()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
const generateID = () => {
  const dateTime = new Date()
  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, '0')
  const day = String(dateTime.getDate()).padStart(2, '0')
  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')
  const seconds = String(dateTime.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}_${hours}${minutes}${seconds}`
}

router.post(
  '/ecpay',
  defineEventHandler(async () => {
    const info = {
      MerchantID: serverEnv.MerchantID,
      MerchantTradeNo: generateID(),
      MerchantTradeDate: generateDate(),
      PaymentType: 'aio',
      TotalAmount: 2000,
      TradeDesc: '測試單',
      ItemName: '商品一#商品二',
      ReturnURL: 'http://localhost:3000',
      CheckMacValue: '12321',
      ChoosePayment: 'Credit',
      EncryptType: 1,
    }
    const { data } = await axios.post(
      'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
      info
    )
    console.log('data', data)
    // const data = await generateDate()
    // console.log('dsadwqewq12321', generateDate)
    return serverEnv
  })
)

router.get(
  '/hello',
  defineEventHandler((event) => {
    const urlObj = getRequestURL(event)
    console.log('get123213', urlObj.origin)

    return sendRedirect(event, `/`)
  })
)

export default useBase('/api/money', router.handler)
