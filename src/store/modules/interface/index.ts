import type { HospitalDetail, DeparmentArr, UserInfo } from "@/api/hospital/type";

export interface DetailState {
  hospitalInfo: HospitalDetail
  deparmentArr: DeparmentArr
}
export interface UserState {
  visiable: boolean,
  code: string,
  userInfo: UserInfo
}



