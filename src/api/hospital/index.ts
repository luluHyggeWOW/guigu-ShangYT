import request from "@/utils/request";
import { HospitalDetailResponseData, DeparmentResponseData } from "./type";
enum API {
  HOSPITAL_URLDETAIL = '/hosp/hospital/',
  HOSPITALDEPARMENT_URL = '/hosp/hospital/department/'
}
export const reqHospitalDetail = (hscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_URLDETAIL + hscode)
export const reqHospitalDeparment = (hscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hscode)