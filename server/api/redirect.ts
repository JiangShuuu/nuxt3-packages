import axios from 'axios'

export default defineEventHandler(async () => {
  const data = await axios.get(
    'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'
  )
  console.log('getget', data)
  return data
})
