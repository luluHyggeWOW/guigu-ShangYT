import { defineStore } from "pinia";
import { reqCode, reqUserLogin } from "@/api/hospital/index";
import type { LoginData, UserLoginResponseData, } from "@/api/hospital/type";
import type { UserState } from "./interface/index";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/user'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      visiable: false,
      code: '',
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
      patientInfo: {
        id: "",
        name: "",
        certificatesType: "",
        certificatesNo: "",
        sex: 0,
        birthdate: "",
        phone: "",
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: "",
        contactsName: "",
        contactsCertificatesType: "",
        contactsCertificatesNo: "",
        contactsPhone: "",
      }
    }
  },
  actions: {
    async getCodes(phone: string) {
      let result: any = await reqCode(phone)
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogin(loginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginData)
      if (result.code == 200) {
        this.userInfo = result.data
        SET_TOKEN(JSON.stringify(this.userInfo))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      REMOVE_TOKEN()
      this.userInfo = {
        name: '',
        token: ''
      }
      // let result: UserLoginResponseData = await reqUserLogin()
      // if (result.code == 200) {
      //   this.userInfo = result.data
      //   REMOVE_TOKEN()
      //   return 'ok'
      // } else {
      //   return Promise.reject(new Error(result.message))
      // }
    },
    queryState() {
      let timer = setInterval(() => {
        if (GET_TOKEN()) {
          this.visiable = false
          this.userInfo = JSON.parse(GET_TOKEN() as string)
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  getters: {

  }
})
export default useUserStore