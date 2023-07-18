<template>
  <div>
    <Carousel></Carousel>
    <Search></Search>
    <el-row gutter="20">
      <el-col :span='20' style="padding-right:50px">
        <Level @getLevel="getLevel"></Level>
        <Region @getRegion="getRegion"></Region>
        <div class="hospital">
          <Card v-for="item in hasHospitalArr" :key="item.id" class="item" :hospitalInfo=item />
          <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[8, 16, 24, 32]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total," :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange"
            style="width:100%;margin:20px 0 30px 0" />
        </div>
      </el-col>
      <el-col :span='4'>
        <Tip></Tip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from "./card/index.vue";
import Tip from "./tip/index.vue";
import { reqHospital } from "@/api/home";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { Content, HospitalResponseData } from "@/api/home/type";
let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let hasHospitalArr = ref<Content>([]);
let total = ref<number>(0);
let hostype = ref<any>("");
let districtCode = ref<any>("");
const getHopitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  if (result.code == 200) {
    hasHospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
};
const handleCurrentChange = () => {
  getHopitalInfo();
};
const handleSizeChange = () => {
  getHopitalInfo();
};
const getLevel = (level: string) => {
  hostype.value = level;
  getHopitalInfo();
};
const getRegion = (region: string) => {
  districtCode.value = region;
  getHopitalInfo();
};
onMounted(() => {
  getHopitalInfo();
});
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // margin: 0 80px 0 80px;
  .item {
    width: 49.5%;
    margin: 8px 0;

    // margin-left: 50px;
  }
}
</style>