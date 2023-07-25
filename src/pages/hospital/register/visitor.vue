<template>
  <div class="visitor">
    <div class="top">
      <div class="box">
        <div class="tip">{{user.isInsure==0?'自费':'医保'}}</div>
        <div class="name">{{user.name}}</div>
      </div>
      <el-button type="primary" :icon="Edit" circle style="float: right;" class="btn" />
    </div>
    <div class="bottom">
      <el-form class="form">
        <el-form-item label="证件类型：">{{user.param.certificatesTypeString}}</el-form-item>
        <el-form-item label="证件号码：">{{user.certificatesNo}}</el-form-item>
        <el-form-item label="用户性别：">{{user.sex==1?'男':'女'}}</el-form-item>
        <el-form-item label="出生日期：">{{user.birthdate}}1</el-form-item>
        <el-form-item label="手机号码：">{{user.phone}}</el-form-item>
        <el-form-item label="婚姻状况：">{{user.isMarry==0?'未婚':'已婚'}}</el-form-item>
        <el-form-item label="当前住址：">{{user.param.provinceString}}{{user.param.districtString}}</el-form-item>
        <el-form-item label="详细住址：">{{user.param.fullAddress}}</el-form-item>
      </el-form>
      <transition name="confirm">
        <div class="confirm" v-if="index==currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
defineProps(["user", "currentIndex", "index"]);
</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .top {
    width: 100%;
    height: 80px;
    background: #e7e5e5;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box {
      display: flex;
      align-items: center;
      .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        height: 20px;
        font-size: 14px;
        padding: 3px;
        border-radius: 2px;
        margin-left: 30px;
      }
      .name {
        font-size: 20px;
        color: #7f7f7f;
        margin: 10px;
      }
    }
    .btn {
      margin: 30px;
    }
  }
  .bottom {
    position: relative;
    .form {
      margin: 20px 30px 20px 30px;
      .el-form-item {
        margin-bottom: 8px;
      }
    }
    .confirm {
      position: absolute;
      width: 250px;
      height: 250px;

      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 250px;
      color: red;
      font-size: 35px;
      left: 40px;
      top: 0;
      opacity: 0.3;
      transform: rotate(35deg);
    }
    .confirm-enter-from {
      transform: scalc(1);
    }
    .confirm-enter-active {
      transition: all 0.3s;
    }
    .confirm-enter-to {
      transform: scalc(1.2);
    }
  }
}
</style>