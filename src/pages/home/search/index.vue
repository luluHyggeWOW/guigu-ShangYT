<template>
  <div class="search">
    <el-autocomplete v-model="hosname" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
      placeholder="请输入医院名称" @select="handleSelect" />
    <el-button type="primary" :icon="Search" style="height:40px">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { reqHospitalInfo } from "@/api/home/index";
import { Content, HospitalInfo } from "@/api/home/type";
import { useRouter } from "vue-router";
let hosname = ref<string>("");
let $router = useRouter();
const querySearch = async (keyword: any, cb: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  if (result.code == 200) {
    console.log(result);
    let showData = result.data.map((item) => {
      return {
        value: item.hosname,
        hoscode: item.hoscode,
      };
    });
    cb(showData);
  } else {
  }
};
const handleSelect = (item: any) => {
  console.log(item);
  $router.push({
    path: "/hospital/register",
    query: { hoscode: item.hoscode },
  });
};
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