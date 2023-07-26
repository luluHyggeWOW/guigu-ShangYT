<template>
  <div class="user">
    <div class="menu">
      <div class="top">
        <el-icon class="icon">
          <HomeFilled />
        </el-icon>
        <span>/ 会员中心</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        router="true">
        <el-menu-item index="/user/certification">
          <template #title>
            <el-icon>
              <Postcard />
            </el-icon>
            <span>实名认证</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/user/order">
          <el-icon>
            <Memo />
          </el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient">
          <el-icon>
            <User />
          </el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile">

          <el-icon>
            <Document />
          </el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback">
          <el-icon>
            <ChatDotSquare />
          </el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Postcard,
  Memo,
  User,
  Document,
  ChatDotSquare,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import useDetailStore from "@/store/modules/hospital";
let $route = useRoute();
let detailStore = useDetailStore();
onMounted(() => {
  if ($route.query.hoscode != undefined) {
    localStorage.setItem("hoscode", $route.query.hoscode as string);
    detailStore.getHospital($route.query.hoscode as string);
    detailStore.getDeparment($route.query.hoscode as string);
  } else {
    detailStore.getHospital(localStorage.getItem("hoscode") as string);
    detailStore.getDeparment(localStorage.getItem("hoscode") as string);
  }
});
</script>

<style scoped lang="scss">
.user {
  display: flex;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .top {
      margin: 20px;
      font-size: 20px;
      color: #7f7f7f;
      .icon {
        position: relative;
        top: 2px;
      }
    }
  }
  .content {
    flex: 12;
  }
}
</style>