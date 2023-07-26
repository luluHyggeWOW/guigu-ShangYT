<template>
  <div>
    <div>
      <el-card>
        <template #header>
          <div class="card-header">
            <h1>请确认就诊人</h1>
            <el-button type="success" @click="1" :icon="User">添加就诊人</el-button>
          </div>
        </template>
      </el-card>
    </div>
    <div>222</div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
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