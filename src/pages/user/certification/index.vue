<template>
  <div class="info">
    <h1>{{hospitalStore.hospitalInfo.hospital?.hosname}}听诊信息</h1>
    <el-empty description="暂无信息" />
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
h1 {
  display: flex;
  font-size: 30px;
  justify-content: center;
}
</style>