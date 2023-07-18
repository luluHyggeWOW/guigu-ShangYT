<template>
  <div class="hospital">
    <div class="menu">
      <div class="top">
        <el-icon class="icon">
          <HomeFilled />
        </el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        router="true">
        <el-menu-item index="/hospital/register">
          <template #title>
            <el-icon>
              <Calendar />
            </el-icon>
            <span>预约挂号</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/hospital/detail">
          <el-icon>
            <Document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice">
          <el-icon>
            <Bell />
          </el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close">
          <el-icon>
            <Warning />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
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
  Document,
  Location,
  Calendar,
  Bell,
  Warning,
  Search,
  HomeFilled,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import useDetailStore from "@/store/modules/hospital";
let $route = useRoute();
let detailStore = useDetailStore();
onMounted(() => {
  detailStore.getHospital($route.query.hoscode);
});
</script>

<style scoped lang="scss">
.hospital {
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