import request from "@/utils/request";
import {
  SubmitOrder, OrderResponseData, QrCode, PayReslt, UserInfoResponseData,
  CertationTypeResponseData, UserParams, UserOrderInfoResponseData, AllUserResponseData,
  AllOrderStateResponseData, AddOrUpdateUser

} from "./type";
enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  QRCODE_URL = '/order/weixin/createNative/',
  PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  USERINFO_URL = '/user/auth/getUserInfo',
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  USERCERTATION_URL = '/user/auth/userAuah',
  USERORDERINFO_URL = '/order/orderInfo/auth/',
  ALLUSER_URL = '/user/patient/auth/findAll',
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
  CITY_URL = '/cmn/dict/findByParentId/',
  ADDUSER_URL = '/user/patient/auth/save',
  UPDATEUSER_URL = '/user/patient/auth/update',
  DELETEUSER_URL = '/user/patient/auth/remove/'
}
export const reqSubmitOrder = (hscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hscode}/${scheduleId}/${patientId}`)
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)
export const reqCancelOrder = (id: string) => request.get<any, OrderResponseData>(API.ORDERCANCEL_URL + id)
export const reqQrCode = (orderId: string) => request.get<any, QrCode>(API.QRCODE_URL + orderId)
export const reqQueryPayState = (orderId: string) => request.get<any, PayReslt>(API.PAYRESULT_URL + orderId)
export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)
export const reqCertationType = (CertificatesType = "CertificatesType") => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType)
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL + data)
export const reqUserOrderInfo = (pageNo: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${pageNo}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
export const reqAllUser = () => request.get<any, AllUserResponseData>(API.ALLUSER_URL)
export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL)
export const reqCity = (parentId: string) => request.get<any, AddOrUpdateUser>(API.CITY_URL + parentId)
export const reqAddOrUpdataUser = (data: any) => {
  if (data.id == undefined) return request.post<any, any>(API.ADDUSER_URL, data)
  else return request.post<any, any>(API.UPDATEUSER_URL, data)
}
export const reqRemoveUser = (id: number) => request.delete<any, any>(API.DELETEUSER_URL + id)
