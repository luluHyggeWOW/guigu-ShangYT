import request from "@/utils/request";
import {
  HospitalDetailResponseData, DeparmentResponseData, LoginData, UserLoginResponseData,
  WxLoginResponseData, HospitalWorkData
} from "./type";
enum API {
  HOSPITAL_URLDETAIL = '/hosp/hospital/',
  HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
  GETUSERCODE_URL = '/sms/send/',
  USERLOGIN_URL = '/user/login',
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/'
}
export const reqHospitalDetail = (hscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_URLDETAIL + hscode)
export const reqHospitalDeparment = (hscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hscode)
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WxLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);
export const reqHospitalWork = (page: number, limit: number, hoscode: string, dpcode: string) => request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${dpcode}`);