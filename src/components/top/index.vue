<template>
  <div class="top">
    <div class="content">
      <div class="left">
        <img src="../../assets/images/logo.png" alt="">
        <p>商医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login">登录/注册</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: center;
  .content {
    width: 90%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
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
    }
  }
}
</style>