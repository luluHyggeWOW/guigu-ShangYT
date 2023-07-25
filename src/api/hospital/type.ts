export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface HospitalDetail {
  bookingRule: {
    cycle: number,
    releaseTime: string,
    stopTime: string,
    quitDay: number,
    quitTime: string,
    rule: string[]
  }
  hospital: {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
      hostypeString: string,
      fullAddress: string
    }
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: null,
    route: string,
    status: number,
    bookingRule: null
  }
}
export interface HospitalDetailResponseData extends ResponseData {
  data: HospitalDetail
}
//代表医院科室的数据
export interface Deparment {
  depcode: string,
  depname: string,
  children?: Deparment[]
}
export type DeparmentArr = Deparment[]
export interface DeparmentResponseData extends ResponseData {
  data: DeparmentArr
}
export interface LoginData {
  phone: string,
  code: string
}
export interface UserInfo {
  name: string,
  token: string
}
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}
export interface WxLogin {
  redirectUri: string,
  appid: string,
  scope: string,
  state: string
}
export interface WxLoginResponseData extends ResponseData {
  data: WxLogin
}
export interface BaseMap {
  workDateString: string,
  releaseTime: string,
  bigname: string,
  stopTime: string,
  depname: string,
  hosname: string
}
export interface WorkData {
  workDate: string,
  workDateMd: string,
  dayOfweek: string,
  docCount: number,
  reservedNumber: null
  availableNumber: number,
  status: number
}
export type BookingScheduleList = WorkData[]
export interface HospitalWorkData extends ResponseData {
  data: {
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: BaseMap
  }
}