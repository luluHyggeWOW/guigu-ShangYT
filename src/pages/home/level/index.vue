<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hp">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="item in levelArr" :key="item.value" @click="changeLevel(item.value)"
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
let levelArr = ref<HospitalLevelOrRegionArr>();
let activeFlag = ref<string>("");
const getLevel = async () => {
  let result: HospitalLevelOrRegionArrResponseData =
    await reqHospitalLevelOrRegion("HosType");
  if (result.code == 200) {
    console.log(result);
    levelArr.value = result.data;
  } else {
  }
};
const changeLevel = (level: any) => {
  activeFlag.value = level;
  $emit("getLevel", level);
};
let $emit = defineEmits(["getLevel"]);
onMounted(() => {
  getLevel();
});
</script>

<style scoped lang="scss">
.level {
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
    margin-top: 20px;
    .left {
      width: 57px;
    }
    .hp {
      display: flex;
      li {
        margin: 0 20px 0 20px;
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