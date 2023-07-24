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
      userInfo: JSON.parse(GET_TOKEN() as string) || {}
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
      let result: UserLoginResponseData = await reqUserLogin(loginData)
      if (result.code == 200) {
        this.userInfo = result.data
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {

  }
})
export default useUserStore