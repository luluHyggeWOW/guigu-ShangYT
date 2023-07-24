import request from "@/utils/request";
import {
  HospitalDetailResponseData, DeparmentResponseData, LoginData, UserLoginResponseData
} from "./type";
enum API {
  HOSPITAL_URLDETAIL = '/hosp/hospital/',
  HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
  GETUSERCODE_URL = '/sms/send/',
  USERLOGIN_URL = '/user/login'
}
export const reqHospitalDetail = (hscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_URLDETAIL + hscode)
export const reqHospitalDeparment = (hscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hscode)
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);