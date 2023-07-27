<template>
  <div class="container">
    <div class="tip">
      确认挂号信息
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>请确认就诊人</h1>
          <el-button type="success" @click="goUser" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <div class="user">
        <Visitor @click="changeIndex(index)" v-for="(user,index) in userArr" :key="user.id" :user="user" class="item"
          :index="index" :currentIndex="currentIndex" />
      </div>
      <template #bottom>
        <div class=" card-header">
          <h1 style="font-size:24px">请确认就诊人</h1>

        </div>
      </template>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>挂号信息</h1>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="就诊日期：" align="center">{{docInfo?.workDate}}</el-descriptions-item>
        <el-descriptions-item label="就诊医院：" align="center">{{docInfo?.param?.hosname}}</el-descriptions-item>
        <el-descriptions-item label="就诊科室：" align="center">{{docInfo?.param?.depname}}</el-descriptions-item>
        <el-descriptions-item label="医生姓名：" align="center">{{docInfo?.docname}}</el-descriptions-item>
        <el-descriptions-item label="医生职称：" align="center">{{docInfo?.title}}</el-descriptions-item>
        <el-descriptions-item label="医生专长：" align="center">{{docInfo?.skill}}</el-descriptions-item>
        <el-descriptions-item label="医事服务费：" align="center">
          <p style="color:red;">{{docInfo?.amount}}</p>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="btn"><el-button type="primary" class="btnn" size="large" :disabled="currentIndex==-1"
        @click="submitOrder">确认提交</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import Visitor from "./visitor.vue";
import { reqGetUser, reqDoctorInfo } from "@/api/hospital/index";
import { reqSubmitOrder } from "@/api/user/index";
import type { SubmitOrder } from "@/api/user/type";
import type {
  UserArr,
  UserResponseData,
  DoctorInfoData,
  Doctor,
} from "@/api/hospital/type";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
let $route = useRoute();
let $router = useRouter();
let userArr = ref<UserArr>([]);
let docInfo = ref<Doctor>();
let currentIndex = ref<number>(-1);
const fetchUserData = async () => {
  let result: UserResponseData = await reqGetUser();
  if (result.code == 200) {
    userArr.value = result.data;
  }
};
const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo(
    $route.query.docId as string
  );
  if (result.code == 200) {
    docInfo.value = result.data;
  }
};
const changeIndex = (index: number) => {
  currentIndex.value = index;
};
const goUser = () => {
  $router.push({ path: "/user/patient", query: { type: "add" } });
};

const submitOrder = async () => {
  let result: SubmitOrder = await reqSubmitOrder(
    docInfo.value?.hoscode as string,
    docInfo.value?.id as string,
    userArr.value[currentIndex.value].id as number
  );
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage.error(result.message);
    $router.push({ path: "/user/order", query: { orderId: 431 } });
  }
};
onMounted(() => {
  fetchUserData();
  fetchInfo();
});
</script>

<style scoped lang="scss">
.container {
  margin: 60px 0 0 30px;

  .tip {
    font-size: 25px;
    // color: #7f7f7f;
    font-weight: 600;
  }
  .box-card {
    margin: 40px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        font-size: 24px;
        margin: 10px;
      }
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 23%;
        margin: 1%;
      }
    }
  }
  .btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    .btnn {
      width: 200px;
    }
  }
}
</style>