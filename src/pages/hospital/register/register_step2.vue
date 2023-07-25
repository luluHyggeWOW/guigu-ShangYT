<template>
  <div class="container">
    <div class="tip">
      确认挂号信息
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>请确认就诊人</h1>
          <el-button type="success" @click="1" :icon="User">添加就诊人</el-button>
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
      <el-descriptions title="Customized style list" :column="2" border>
        <el-descriptions-item label="就诊日期：" align="center">{{docInfo?.workDate}}</el-descriptions-item>
        <el-descriptions-item label="就诊医院：" align="center">{{docInfo?.param?.hosname}}</el-descriptions-item>
        <el-descriptions-item label="就诊科室：" align="center">{{docInfo?.param?.depname}}</el-descriptions-item>
        <el-descriptions-item label="医生姓名：" align="center">{{docInfo?.docname}}</el-descriptions-item>
        <el-descriptions-item label="医生职称：" align="center">{{docInfo?.title}}</el-descriptions-item>
        <el-descriptions-item label="医生专长：" align="center">{{docInfo?.skill}}</el-descriptions-item>
        <el-descriptions-item label="医事服务费：" align="center">{{docInfo?.amount}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import Visitor from "./visitor.vue";
import { reqGetUser, reqDoctorInfo } from "@/api/hospital/index";
import type {
  UserArr,
  UserResponseData,
  DoctorInfoData,
  Doctor,
} from "@/api/hospital/type";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
let $route = useRoute();
let userArr = ref<UserArr>();
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
}
</style>