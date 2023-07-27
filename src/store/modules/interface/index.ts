import type { HospitalDetail, DeparmentArr, UserInfo } from "@/api/hospital/type";
import type { AddOrUpdateUser } from "@/api/user/type";

export interface DetailState {
  hospitalInfo: HospitalDetail
  deparmentArr: DeparmentArr
}
export interface UserState {
  visiable: boolean,
  code: string,
  userInfo: UserInfo,
  patientInfo: AddOrUpdateUser
}



