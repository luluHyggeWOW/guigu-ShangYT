import request from "@/utils/request";
import {
  SubmitOrder, OrderResponseData, QrCode
} from "./type";
enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  QRCODE_URL = '/order/weixin/createNative/',

}
export const reqSubmitOrder = (hscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hscode}/${scheduleId}/${patientId}`)
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)
export const reqCancelOrder = (id: string) => request.get<any, OrderResponseData>(API.ORDERCANCEL_URL + id)
export const reqQrCode = (orderId: string) => request.get<any, QrCode>(API.QRCODE_URL + orderId)