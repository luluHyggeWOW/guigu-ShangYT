<template>
  <div class="login">
    <el-dialog v-model="userStore.visiable" title="用户登录" :lock-scroll="false" @close="close">
      <el-row>
        <el-col :span="12">
          <div class="logindiv">
            <div v-show="scene==0">
              <el-form :rules="rules" :model="loginParam">
                <el-form-item label="手机号：" prop="phone">
                  <el-input v-model="loginParam.phone" autocomplete="off" placeholder="请输入手机号" maxlength="11"
                    :prefix-icon="User" />
                </el-form-item>
                <el-form-item label="验证码：" prop="code" :label-width="formLabelWidth">
                  <el-input v-model="loginParam.code" autocomplete="off" placeholder="请输入手机验证码" :prefix-icon="Lock" />
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                  <el-button :disabled="!isPhone||flag?true:false" @click="getCode">
                    获取验证码
                    <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                  </el-button>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                  <el-button type="primary" style="width:100%" :disabled="!isPhone||loginParam.code.length<6?true:false"
                    @click="login">用户登录</el-button>
                </el-form-item>
                <div class="bottom">
                  <p style="">微信扫码登录</p>
                  <svg @click="changeScene" t="1689842855664" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2340" width="32" height="32">
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445" p-id="2341"></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445" p-id="2342"></path>
                  </svg>
                </div>

              </el-form>
            </div>
            <div v-show="scene==1" class="wechat">
              <div id="login_container"></div>
              <p style="color:#7f7f7f;margin-top:20px;font-size:17px">手机短信验证码登录</p>
              <div class="svg" @click="scene=0"><svg t="1689844373401" class="icon" viewBox="0 0 1024 1024"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4118" width="32" height="32">
                  <path
                    d="M512.3072 883.3024c-41.2672 0-74.8544-33.5872-74.8544-74.8544s33.5872-74.8544 74.8544-74.8544 74.8544 33.5872 74.8544 74.8544S553.5744 883.3024 512.3072 883.3024zM512.3072 770.4576c-20.992 0-37.9904 16.9984-37.9904 37.9904s16.9984 37.9904 37.9904 37.9904 37.9904-16.9984 37.9904-37.9904S533.1968 770.4576 512.3072 770.4576z"
                    fill="#ffffff" p-id="4119"></path>
                  <path
                    d="M680.1408 991.9488c-3.1744 0-6.4512-0.8192-9.4208-2.56-41.2672-24.4736-108.032-24.3712-108.7488-24.3712 0 0-0.1024 0-0.1024 0L276.8896 965.0176c-54.3744 0-98.5088-44.2368-98.5088-98.5088L178.3808 140.3904c0-54.3744 44.2368-98.5088 98.5088-98.5088l470.7328 0c54.3744 0 98.5088 44.2368 98.5088 98.5088l0 726.1184c0 54.3744-44.2368 98.5088-98.5088 98.5088-10.1376 0-18.432-8.2944-18.432-18.432s8.2944-18.432 18.432-18.432c33.9968 0 61.6448-27.648 61.6448-61.6448L809.2672 140.3904c0-33.9968-27.648-61.6448-61.6448-61.6448L276.8896 78.7456c-33.9968 0-61.6448 27.648-61.6448 61.6448l0 726.1184c0 33.9968 27.648 61.6448 61.6448 61.6448l284.8768 0c4.1984 0 78.0288-0.1024 127.7952 29.4912 8.704 5.2224 11.6736 16.4864 6.4512 25.2928C692.5312 988.7744 686.4896 991.9488 680.1408 991.9488z"
                    fill="#ffffff" p-id="4120"></path>
                  <path
                    d="M589.824 149.7088 434.7904 149.7088c-10.1376 0-18.432-8.2944-18.432-18.432s8.2944-18.432 18.432-18.432L589.824 112.8448c10.1376 0 18.432 8.2944 18.432 18.432S599.9616 149.7088 589.824 149.7088z"
                    fill="#ffffff" p-id="4121"></path>
                  <path
                    d="M705.024 230.0928c9.728 0 17.7152 7.8848 17.7152 17.7152l0 376.9344c0 9.728-7.8848 17.7152-17.7152 17.7152L319.5904 642.4576c-9.728 0-17.7152-7.8848-17.7152-17.7152L301.8752 247.808c0-9.728 7.8848-17.7152 17.7152-17.7152L705.024 230.0928M705.024 193.2288 319.5904 193.2288c-30.1056 0-54.5792 24.4736-54.5792 54.5792l0 376.9344c0 30.1056 24.4736 54.5792 54.5792 54.5792l385.4336 0c30.1056 0 54.5792-24.4736 54.5792-54.5792L759.6032 247.808C759.6032 217.7024 735.1296 193.2288 705.024 193.2288L705.024 193.2288z"
                    fill="#ffffff" p-id="4122"></path>
                </svg></div>
            </div>
          </div>

        </el-col>
        <el-col :span="12">
          <div class="right">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="">
                <svg t="1689843108750" class="icon" viewBox="0 0 1025 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2588" width="16" height="16">
                  <path
                    d="M498.816 345.056c26.336 0 43.936-17.632 43.936-43.904 0-26.56-17.568-43.744-43.936-43.744s-52.832 17.184-52.832 43.744C446.016 327.424 472.48 345.056 498.816 345.056zM253.088 257.408c-26.336 0-52.96 17.184-52.96 43.744 0 26.272 26.624 43.904 52.96 43.904 26.24 0 43.808-17.632 43.808-43.904C296.864 274.592 279.328 257.408 253.088 257.408zM1024 626.112c0-138.88-128.832-257.216-286.976-269.536 0.224-1.728 0.32-3.52-0.064-5.312-31.712-147.84-190.688-259.296-369.824-259.296C164.704 91.968 0 233.12 0 406.624c0 93.088 47.52 176.96 137.568 243.104l-31.392 94.368c-2.016 6.144-0.192 12.896 4.704 17.152 2.976 2.56 6.72 3.904 10.496 3.904 2.432 0 4.896-0.576 7.168-1.696L246.4 704.48l14.528 2.944c36.288 7.456 67.616 13.92 106.208 13.92 11.36 0 22.88-0.512 34.176-1.472 4.576-0.384 8.448-2.688 11.072-6.016 42.496 106.336 159.616 183.104 297.44 183.104 35.296 0 71.04-8.512 103.104-16.544l90.848 49.664c2.4 1.312 5.056 1.984 7.68 1.984 3.584 0 7.168-1.216 10.048-3.552 5.056-4.096 7.136-10.848 5.248-17.024l-23.2-77.152C981.344 772.864 1024 699.328 1024 626.112zM398.592 687.968c-10.4 0.896-20.96 1.344-31.424 1.344-35.328 0-65.216-6.112-99.776-13.248L247.296 672c-3.456-0.736-7.104-0.256-10.272 1.376l-88.288 44.192 22.944-68.928c2.24-6.752-0.224-14.112-6.016-18.176C76.96 568.64 32 493.312 32 406.624c0-155.84 150.336-282.656 335.136-282.656 163.36 0 308 99.392 337.856 231.584-171.296 2.24-309.888 122.656-309.888 270.56 0 21.504 3.264 42.336 8.768 62.432C402.208 688.128 400.448 687.808 398.592 687.968zM875.456 815.552c-5.344 4.032-7.616 10.976-5.696 17.376l15.136 50.336-62.112-33.984c-2.368-1.312-5.024-1.984-7.68-1.984-1.312 0-2.624 0.16-3.904 0.512-33.312 8.416-67.776 17.088-101.344 17.088-155.904 0-282.72-107.136-282.72-238.816 0-131.68 126.816-238.784 282.72-238.784 152.928 0 282.144 109.344 282.144 238.784C992 691.744 950.624 759.04 875.456 815.552zM612.992 511.968c-17.568 0-35.136 17.696-35.136 35.232 0 17.664 17.568 35.104 35.136 35.104 26.4 0 43.84-17.44 43.84-35.104C656.832 529.632 639.392 511.968 612.992 511.968zM806.016 511.968c-17.312 0-34.88 17.696-34.88 35.232 0 17.664 17.568 35.104 34.88 35.104 26.304 0 44.064-17.44 44.064-35.104C850.08 529.632 832.352 511.968 806.016 511.968z"
                    fill="#7f7f7f" p-id="2589"></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>“快速预约挂号”</p>
              </div>
              <div class="item">
                <img src="../../assets/images/code_login_wechat.png" alt="">
                <svg t="1689843178855" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3818" width="16" height="16">
                  <path
                    d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                    fill="#7f7f7f" p-id="3819"></path>
                  <path
                    d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                    fill="#7f7f7f" p-id="3820"></path>
                </svg>
                <p>扫一扫下载</p>
                <p>“预约挂号”APP</p>
              </div>
            </div>
            <div class="bottom">
              <p>治不好指定平台</p>
              <p>快速挂号 安全放心</p>
            </div>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userStore.visiable = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { User, Lock } from "@element-plus/icons-vue";
import { ref, reactive, computed, watch } from "vue";
import CountDown from "@/components/countdown/index.vue";
import { reqWxLogin } from "@/api/hospital/index";
import type { WxLoginResponseData } from "@/api/hospital/type";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let $router = useRouter();
let $route = useRoute();
let scene = ref<number>(0);
let flag = ref<boolean>(false);
let userStore = useUserStore();
let loginParam = reactive({
  phone: "",
  code: "",
});
let isPhone = computed(() => {
  let reg =
    /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
  return reg.test(loginParam.phone);
});
const getCode = () => {
  flag.value = true;
  try {
    userStore.getCodes(loginParam.phone);
    loginParam.code = userStore.code;
  } catch (error) {}
};
const getFlag = (flagvalue: boolean) => {
  flag.value = flagvalue;
};
const login = async () => {
  try {
    await userStore.userLogin(loginParam);
    userStore.visiable = false;
    let redirect = $route.query.redirect;
    if (redirect) $router.push(redirect as string);
    else $router.push("/home");
  } catch (error) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};
const close = () => {
  Object.assign(loginParam, {
    phone: "",
    code: "",
  });
};
const changeScene = async () => {
  scene.value = 1;
  let redirect_uri = encodeURIComponent(window.location.origin + "/wxlogin");
  let result: WxLoginResponseData = await reqWxLogin(redirect_uri);
  if (result.code == 200) {
    // alert(result.data.state.slice(4));
    console.log(result.data);
    // @ts-ignore
    new WxLogin({
      self_redirect: true,
      id: "login_container",
      appid: result.data.appid,
      scope: result.data.scope,
      redirect_uri: result.data.redirectUri,
      state: result.data.state,
      style: "",
      href: "",
    });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
watch(
  () => scene.value,
  (val: number) => {
    if (val == 1) {
      userStore.queryState();
    }
  }
);
</script>
<script lang="ts">
export default {
  name: "Login",
};
</script>

<style scoped lang="scss">
.login {
  ::v-deep(.el-dialog__body) {
    border-top: solid 1px #ccc;
    width: 96%;
    margin: auto;
  }
  .logindiv {
    border-radius: 10px;
    border: 1px solid #ccc;
    height: auto;
    padding: 20px;
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-bottom: 10px;
      }
      svg {
        cursor: pointer;
      }
    }
    .wechat {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        padding: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
      }
      p {
        color: black;
        margin: 5px;
      }
      .svg {
        // margin-top: 10px;
        background: orange;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .right {
    margin-left: 20px;
    .top {
      display: flex;
      justify-content: space-between;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 200px;
        }
      }
    }
    .bottom {
      margin-top: 40px;
      text-align: center;
      p {
        margin: 20px;
        font-size: 25px;
      }
    }
  }
}
</style>