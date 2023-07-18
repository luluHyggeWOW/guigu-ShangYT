<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul class="hp">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="item in regionArr" :key="item.value" @click="changeLevel(item.value)"
          :class="{active:activeFlag==item.value}">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  HospitalLevelOrRegionArr,
  HospitalLevelOrRegionArrResponseData,
} from "@/api/home/type";
import { reqHospitalLevelOrRegion } from "@/api/home";
import { ref, onMounted } from "vue";
let regionArr = ref<HospitalLevelOrRegionArr>();
let activeFlag = ref<string>("");
const getRegion = async () => {
  let result: HospitalLevelOrRegionArrResponseData =
    await reqHospitalLevelOrRegion("Beijin");
  console.log(result);
  if (result.code == 200) {
    console.log(result);
    regionArr.value = result.data;
  } else {
  }
};
const changeLevel = (value: any) => {
  activeFlag.value = value;
  $emit("getRegion", value);
};

let $emit = defineEmits(["getRegion"]);
onMounted(() => {
  getRegion();
});
</script>

<style scoped lang="scss">
.region {
  width: 100%;
  height: 50px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin: 10px 0;
  color: #7f7f7f;
  font-size: 18px;
  .content {
    display: flex;
    margin-top: 40px;
    .left {
      width: 70px;
    }
    .hp {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0 20px 10px 20px;
        cursor: pointer;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>