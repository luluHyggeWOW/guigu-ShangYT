import request from "@/utils/request";
import {
  HospitalDetailResponseData, DeparmentResponseData, LoginData, UserLoginResponseData,
  WxLoginResponseData, HospitalWorkData, DoctorResponseData, UserResponseData, DoctorInfoData
} from "./type";
enum API {
  HOSPITAL_URLDETAIL = '/hosp/hospital/',
  HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
  GETUSERCODE_URL = '/sms/send/',
  USERLOGIN_URL = '/user/login',
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  HOSPITALDOCTOR_URL = 'hosp/hospital/auth/findScheduleList/',
  GETUSER_URL = '/user/patient/auth/findAll',
  GETDOCTOR_URL = '/hosp/hospital/getSchedule/',

}
export const reqHospitalDetail = (hscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_URLDETAIL + hscode)
export const reqHospitalDeparment = (hscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hscode)
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WxLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);
export const reqHospitalWork = (page: number, limit: number, hoscode: string, dpcode: string) => request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${dpcode}`);
export const reqHospitalDoctor = (hoscode: string, dpcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${dpcode}/${workDate}`);
export const reqGetUser = () => request.get<any, UserResponseData>(API.GETUSER_URL)
export const reqDoctorInfo = (scheduleId: string) => request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId)
