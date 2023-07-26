export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface SubmitOrder extends ResponseData {
  data: number
}
export interface OrderInfo {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  }
  userId: number,
  outTradeNo: string,
  hoscode: string,
  hosname: string,
  depcode: string,
  depname: string,
  scheduleId: string,
  title: string,
  reserveDate: string,
  reserveTime: number,
  patientId: number,
  patientName: string,
  patientPhone: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderStatus: number
}
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}
export interface PayInfo {
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}
export interface QrCode extends ResponseData {
  data: PayInfo
}