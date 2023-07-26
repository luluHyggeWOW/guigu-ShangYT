<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>挂号详情</h1>
      </div>
    </template>
    <div class="top">
      <el-tag :type="orderInfo.orderStatus==-1?'warning':'success'" effect="light" class="tag">
        <svg v-if="orderInfo.orderStatus==-1" t="1690342053363" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="4774" width="16" height="16">
          <path
            d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 254.4l-45.6-45.6L512 467.2 318.4 273.6l-45.6 45.6L467.2 512 273.6 705.6l45.6 45.6L512 557.6l193.6 193.6 45.6-45.6L557.6 512l192.8-193.6z"
            p-id="4775" fill="#e0620d"></path>
        </svg>
        <svg v-else t="1690338211468" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2291" width="16" height="16">
          <path
            d="M512 170.666667a341.333333 341.333333 0 0 0-290.133333 521.216 42.666667 42.666667 0 0 1-72.533334 45.013333A424.874667 424.874667 0 0 1 85.333333 512C85.333333 276.352 276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667a424.874667 424.874667 0 0 1-234.666667-70.314667 42.666667 42.666667 0 1 1 46.933334-71.210667A341.333333 341.333333 0 1 0 512 170.666667z m222.165333 264.832a42.666667 42.666667 0 0 0-60.330666-60.330667L469.333333 579.669333l-119.168-119.168a42.666667 42.666667 0 0 0-60.330666 60.330667l149.333333 149.333333a42.666667 42.666667 0 0 0 60.330667 0l234.666666-234.666666z"
            fill="#1afa29" p-id="2292"></path>
        </svg>

        <span>{{orderInfo?.param?.orderStatusString}}</span>
      </el-tag>
      <div class="right">
        <img src="../../../../assets/images/code_app.png" alt="">
        <div>
          <div>微信
            <svg t="1690338921868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3540" width="16" height="16">
              <path
                d="M992.896 624.448c0-133.824-131.008-242.368-292.608-242.368-161.6 0-292.608 108.48-292.608 242.368 0 133.952 131.008 242.432 292.608 242.432 37.376 0 73.024-6.016 105.792-16.576l92.224 50.496-24.32-81.344c0.32-0.192 0.704-0.32 1.024-0.512C946.56 774.656 992.896 704.064 992.896 624.448zM594.624 578.688c-21.696 0-39.168-17.6-39.168-39.168 0-21.632 17.472-39.168 39.168-39.168 21.568 0 39.104 17.536 39.104 39.168C633.728 561.088 616.192 578.688 594.624 578.688zM792.64 578.688c-21.632 0-39.104-17.6-39.104-39.168 0-21.632 17.472-39.168 39.104-39.168s39.168 17.536 39.168 39.168C831.808 561.088 814.272 578.688 792.64 578.688z"
                fill="#707070" p-id="3541"></path>
              <path
                d="M689.984 371.904c4.608 0 9.216 0.064 13.696 0.256-18.304-139.968-161.408-248.96-335.232-248.96-186.24 0-337.28 125.12-337.28 279.36 0 91.776 53.376 173.184 135.872 224.128 0.384 0.192 0.768 0.384 1.152 0.64l-27.968 93.76 106.24-58.24c37.888 12.16 78.912 19.072 121.984 19.072 13.504 0 26.816-0.704 39.936-2.048-7.04-20.8-10.944-42.816-10.944-65.536C397.376 480.384 528.448 371.904 689.984 371.904zM490.24 259.456c24.896 0 45.12 20.224 45.12 45.184 0 24.896-20.224 45.12-45.12 45.12-24.96 0-45.184-20.224-45.184-45.12C445.12 279.68 465.344 259.456 490.24 259.456zM261.952 349.76c-24.896 0-45.12-20.224-45.12-45.12 0-24.96 20.16-45.184 45.12-45.184 24.96 0 45.184 20.224 45.184 45.184C307.136 329.536 286.912 349.76 261.952 349.76z"
                fill="#707070" p-id="3542"></path>
            </svg>关注“北京114预约挂号”
          </div>
          <div>“快速预约挂号”</div>
        </div>

      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="就诊人信息：" align="center">{{orderInfo?.patientName}}</el-descriptions-item>
          <el-descriptions-item label="就诊日期：" align="center">{{orderInfo?.reserveDate}}</el-descriptions-item>
          <el-descriptions-item label="就诊医院：" align="center">{{orderInfo?.hosname}}</el-descriptions-item>
          <el-descriptions-item label="就诊科室：" align="center">{{orderInfo?.depname}}</el-descriptions-item>
          <el-descriptions-item label="医生职称：" align="center">{{orderInfo?.title}}</el-descriptions-item>
          <el-descriptions-item label="医事服务费：" align="center">
            <p style="color:red">{{orderInfo?.amount}}</p>
          </el-descriptions-item>
          <el-descriptions-item label="挂号单号：" align="center">{{orderInfo?.scheduleId}}</el-descriptions-item>
          <el-descriptions-item label="挂号时间：" align="center">{{orderInfo?.createTime}}</el-descriptions-item>
        </el-descriptions>

      </div>
      <div class="right">
        <el-card class="box-card" shadow="none">
          <template #header>
            <h1>注意事项</h1>
          </template>
          <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;</p>
          <p style="color:red">2.[取号] 就诊当天需在{{orderInfo?.fetchTime}}前 在医院取号，未取号视为爽约，该号不退不换</p>
          <p>3.[退号]在{{orderInfo?.quitTime}} 15:30前可在线退号，逾期将不可办理退号退费;</p>
          <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号</p>
          <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号</p>
        </el-card>
        <div class="btn" v-if="!orderInfo.orderStatus==-1">
          <el-popconfirm title="确定取消预约吗" @confirm="cancel">
            <template #reference>
              <el-button type="danger">取消预约</el-button>
            </template>
          </el-popconfirm>
          <el-button type="success" v-if="orderInfo.orderStatus==0" @click="openDialog">支付</el-button>
        </div>
        <el-dialog v-model="dialogVisible" title="微信支付" width="30%" :before-close="handleClose">
          <div class="code"><img src="../../../../assets/images/code_app.png" alt=""></div>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭窗口</el-button>
            </span>
          </template>
        </el-dialog>
      </div>

    </div>
  </el-card>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
import { onMounted, ref } from "vue";
import { reqOrderInfo, reqCancelOrder, reqQrCode } from "@/api/user/index";
import type { OrderResponseData, QrCode } from "@/api/user/type";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
let $route = useRoute();
let hospitalStore = useDetailStore();
let orderInfo = ref<any>({});
let dialogVisible = ref(true);
const getOrderInfo = async () => {
  let result: OrderResponseData = await reqOrderInfo(
    $route.query.orderId as string
  );
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};
const cancel = async () => {
  let result: any = await reqCancelOrder($route.query.orderId as string);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "取消成功" });
    getOrderInfo();
  } else {
    ElMessage({ type: "error", message: "取消失败" });
  }
};
const getQrCode = async () => {
  let result: QrCode = await reqQrCode($route.query.orderId as string);
  if (result.code == 200) {
  }
};
const openDialog = () => {
  dialogVisible.value = true;
  getQrCode();
};
onMounted(() => {
  getOrderInfo();
  getQrCode();
});
</script>

<style scoped lang="scss">
.box-card {
  margin: 50px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 24px;
      margin: 10px;
    }
  }
  .top {
    .tag {
      // width: 150px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      margin-left: 20px;
      svg {
        position: absolute;
        height: 16px;
      }
      span {
        font-size: 13px;
        line-height: 16px;
        margin-top: -3px;
        margin-left: 20px;
      }
    }
    .right {
      float: right;
      display: flex;
      img {
        width: 30px;
        height: 30px;
      }
      div {
        svg {
          height: 12px;
        }
        font-size: 13px;
      }
    }
  }
  .bottom {
    margin-top: 25px;
    border-top: 1px solid #e6e4e4;
    display: flex;
    .left {
      flex: 4;
      font-size: 23px;
      margin: 20px;
    }
    .right {
      flex: 6;
      .box-card {
        margin: 20px;
        p {
          font-size: 15px;
          line-height: 22px;
        }
      }
      .code {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .btn {
      float: right;
      margin-top: 60px;
    }
  }
}
</style>