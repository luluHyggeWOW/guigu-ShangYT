<template>
  <div>
    <div>
      <Detail></Detail>
    </div>
    <div>
      <Allorder></Allorder>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
import Detail from "./detail/index.vue";
import Allorder from "./allorder/index.vue";
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.register {
  margin: 50px;
  font-size: 18px;
  .top {
    display: flex;
    .title {
      font-size: 25px;
      font-weight: 600;
    }
    .level {
      color: #7f7f7f;
      line-height: 25px;
      margin-left: 10px;
      span {
        margin-left: 5px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 30px;
    .left {
      flex: 1;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .right {
      margin-top: 10px;
      flex: 9;
      div {
        margin-top: 5px;
        color: #7f7f7f;
      }
      .title {
        margin-top: 20px;
      }
    }
  }
  .footer {
    div {
      margin-top: 20px;
      color: #7f7f7f;
    }
  }
}
</style>