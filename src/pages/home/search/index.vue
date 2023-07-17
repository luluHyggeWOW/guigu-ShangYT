<template>
  <div class="search">
    <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
      placeholder="请输入医院名称" @select="handleSelect" />
    <el-button type="primary" :icon="Search" style="height:40px">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  ::v-deep(.el-input__wrapper) {
    width: 600px;
    height: 40px;
  }
}
</style>