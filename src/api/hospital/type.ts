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