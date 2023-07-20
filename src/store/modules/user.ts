import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDeparment } from "@/api/hospital/index";
import type { HospitalDetailResponseData, HospitalDetail, DeparmentResponseData, DeparmentArr } from "@/api/hospital/type";
import type { DetailState } from "./interface/index";
const useUserStore = defineStore('User', {
  state: () => {
    return {
      visiable: false
    }
  },
  actions: {

  },
  getters: {

  }
})
export default useUserStore