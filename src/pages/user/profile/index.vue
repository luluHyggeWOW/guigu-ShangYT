<template>
  <div class="register">
    <div class="top">
      <div class="title">{{hospitalStore.hospitalInfo.hospital?.hosname}}</div>
      <div class="level">
        <svg t="1689670309391" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2507" width="16" height="16">
          <path
            d="M933.248 335.104c-40-10.496-134.048-10.368-271.616-14.016 6.496-30.016 8-57.088 8-105.152C669.632 101.12 585.984 0 512 0c-52.256 0-95.328 42.72-96 95.264-0.704 64.448-20.64 175.744-128 232.192-7.872 4.16-30.4 15.264-33.696 16.704L256 345.6c-16.8-14.496-40.096-25.6-64-25.6H96c-52.928 0-96 43.072-96 96v512c0 52.928 43.072 96 96 96h96c38.08 0 69.952-23.008 85.376-55.264 0.384 0.128 1.056 0.32 1.504 0.384l7.648 1.984 1.472 0.384c18.432 4.576 53.92 13.056 129.76 30.496 16.256 3.712 102.144 22.016 191.104 22.016h174.944c53.312 0 91.744-20.512 114.624-61.696 0.32-0.64 7.68-15.008 13.696-34.432a106.56 106.56 0 0 0 0.736-56.32c34.368-23.616 45.44-59.328 52.64-82.56 12.064-38.112 8.448-66.752 0.064-87.264 19.328-18.24 35.808-46.048 42.752-88.512a120.224 120.224 0 0 0-12.448-75.904c18.112-20.352 26.368-45.952 27.328-69.632l0.384-6.688c0.224-4.192 0.416-6.784 0.416-16 0-40.416-28-91.968-90.752-109.888zM224 928a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h96a32 32 0 0 1 32 32v512z m735.264-462.88C958.624 480.928 952 512 896 512h-64a16 16 0 1 0 0 32h62.016c48 0 54.304 39.808 51.2 59.008-3.968 23.872-15.168 68.992-69.216 68.992H800a15.968 15.968 0 1 0 0 32h63.008c54.016 0 49.248 41.184 41.504 65.76-10.208 32.288-16.448 62.24-84.512 62.24h-52.192a15.968 15.968 0 1 0 0 32h50.176c35.008 0 36.64 33.12 32.992 44.992-4 12.992-8.736 22.624-8.928 23.072-9.664 17.44-25.248 27.936-58.24 27.936h-174.944c-87.872 0-175.04-19.936-177.28-20.448-132.928-30.624-139.936-32.992-148.288-35.36 0 0-27.072-4.576-27.072-28.192L256 434.016c0-15.008 9.568-28.576 25.408-33.344 1.984-0.768 4.672-1.6 6.592-2.4 146.176-60.544 190.688-193.28 192-302.272 0.192-15.328 12-32 32-32 33.824 0 93.632 67.904 93.632 151.936 0 75.872-3.072 88.992-29.632 168.064 320 0 317.76 4.608 345.984 12 35.008 10.016 38.016 39.008 38.016 48.992 0 10.976-0.32 9.376-0.736 20.128z"
            fill="#7f7f7f" p-id="2508"></path>
          <path
            d="M144 832a48 48 0 1 0 0.032 96.032A48 48 0 0 0 144 832z m0 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"
            fill="#7f7f7f" p-id="2509"></path>
        </svg>
        <span>{{hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,`+hospitalStore.hospitalInfo.hospital?.logoData" alt="">
      </div>
      <div class="right">
        <div class="title" style="margin-top:0px">挂号规则</div>
        <div class="time">预约时间：10天 放号时间：{{hospitalStore.hospitalInfo.bookingRule?.releaseTime}}
          停挂时间：{{hospitalStore.hospitalInfo.bookingRule?.stopTime}}</div>
        <div class="address">
          具体位置：{{hospitalStore.hospitalInfo.hospital?.param.fullAddress}}
        </div>
        <div class="route">
          具体路线：{{hospitalStore.hospitalInfo.hospital?.route}}
        </div>
        <div class="releasetime">
          退号时间：就诊前一工作日{{hospitalStore.hospitalInfo.bookingRule?.quitTime}}前取消
        </div>
        <div class="title">医院预约规则</div>
        <div class="ruleinfo" v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
          {{index+1}}、{{item}}
        </div>
      </div>
    </div>
    <div class="deparment">
      <div class="leftNav">
        <ul>
          <li v-for="(deparment,index) in hospitalStore.deparmentArr" :key="deparment.depcode"
            :class="{active:currentIndex==index}" @click="changeIndex(index)">
            {{deparment.depname}}</li>
        </ul>
      </div>
      <div class="deparmentInfo">
        <div class="show" v-for="(deparment) in hospitalStore.deparmentArr" :key="deparment.depcode">
          <h1 class="cur">{{deparment.depname}}</h1>
          <ul>
            <li v-for="(children) in deparment.children" :key="children.depcode">
              <p @click="showLogin(children)">{{children.depname}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
import { ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let hospitalStore = useDetailStore();
let currentIndex = ref<number>(0);
console.log(111, hospitalStore.deparmentArr);
const changeIndex = (index: number) => {
  currentIndex.value = index;
  let allH1 = document.querySelectorAll(".cur");
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
const showLogin = (item: any) => {
  // userStore.visiable = true;
  console.log(item);
  $router.push({
    path: "/hospital/register_step1",
    query: { hoscode: $route.query.hoscode, depcode: item.depcode },
  });
};
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
        margin-top: 10px;
      }
      .title {
        margin-top: 20px;
      }
      .time,
      .address,
      .route,
      .releasetime,
      .ruleinfo {
        color: #7f7f7f;
      }
    }
  }
  .deparment {
    width: 100%;
    height: 500px;
    display: flex;
    font-size: 15px;
    color: #7f7f7f;
    margin-top: 20px;
    .leftNav {
      width: 100px;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          line-height: 40px;
          cursor: pointer;
          border-left: 1px solid transparent;
          &.active {
            background: white;
            border-left: 1px solid red;
            color: red;
          }
        }
      }
    }
    .deparmentInfo {
      margin-left: 10px;
      height: 500px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .show {
        width: 1000px;
        background: rgb(253, 253, 253);
        h1 {
          font-weight: 600;
          width: 100%;
          background: rgb(248, 248, 248);
          line-height: 20px;
          margin-bottom: 10px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 33%;
            height: 30px;
            text-align: center;
            p {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>