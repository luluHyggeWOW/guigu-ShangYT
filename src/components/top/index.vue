<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>商医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{userStore.userInfo.name}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { ArrowDown } from "@element-plus/icons-vue";
let userStore = useUserStore();

let $router = useRouter();
const goHome = () => {
  $router.push({ path: "/home" });
};
const login = () => {
  userStore.visiable = true;
};
const logout = () => {
  userStore.userLogout();
  goHome();
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid rgb(237, 236, 236);
  .content {
    width: 90%;
    height: 78px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    // border-bottom: 2px solid rgb(216, 216, 216);
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        height: 70px;
        width: 70px;
        margin-right: 10px;
      }
      p {
        font-size: 26px;
        color: #55a6fe;
        font-weight: 600;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin-right: 10px;
        font-size: 18px;
        color: rgb(103, 103, 103);
        cursor: pointer;
      }
      p:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>