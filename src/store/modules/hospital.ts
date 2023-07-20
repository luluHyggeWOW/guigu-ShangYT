import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDeparment } from "@/api/hospital/index";
import type { HospitalDetailResponseData, HospitalDetail, DeparmentResponseData, DeparmentArr } from "@/api/hospital/type";
import type { DetailState } from "./interface/index";
const useDetailStore = defineStore('Detail', {
  state: (): DetailState => {
    return {
      hospitalInfo: ({} as HospitalDetail),
      deparmentArr: []
    }
  },
  actions: {
    async getHospital(hoscode: string) {
      let result: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if (result.code == 200) {
        console.log(result);
        this.hospitalInfo = result.data
      }

    },
    async getDeparment(hoscode: string) {
      let result: DeparmentResponseData = await reqHospitalDeparment(hoscode)
      if (result.code == 200) {
        console.log(result);
        this.deparmentArr = result.data

      }

    }
  },
  getters: {

  }
})
export default useDetailStore