<template>
  <div class="warp">
    <div class="top">
      <div class="name">{{workData?.baseMap?.hosname}}</div>
      <div class="line">|</div>
      <div>专科</div>
      <div class="dot">·</div>
      <div class="hosdeparment">{{workData?.baseMap?.depname}}</div>
    </div>
    <div class="center">
      <div class="time">{{workData?.baseMap?.workDateString}}</div>
      <div class="container">
        <div class="item" :class="{active:item.status!=-1&&item.availableNumber!=-1,cur:index==isActive}"
          v-for="(item,index) in workData?.bookingScheduleList " :key="item" @click="changeTime(item,index)">
          <div class="top">{{item.workDate}} {{item.dayOfWeek}}</div>
          <div class="bottom">
            <div v-if="item.status==-1">停止挂号</div>
            <div v-if="item.status==0">
              {{item.availableNumber==-1?'无号':`有号(${item.availableNumber})`}}
            </div>
            <div v-if="item.status==1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" @current-change="fetchWorkData" layout="prev, pager, next"
        :total="workData?.total" />

    </div>
    <div class="bottom">
      <!-- {{workData?.bookingScheduleList[isActive].status}} -->
      <div class="will" v-if="workData?.bookingScheduleList[isActive]?.status==1">
        <span class="time">{{workTime}} {{workData?.baseMap?.releaseTime}}</span>
        <span> 放号</span>
      </div>
      <div class="doctor" v-else>
        <div class="s">
          <div class="title">
            <svg t="1690256709188" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3574" width="32" height="32">
              <path
                d="M512 833.5c-177.3 0-321.5-144.2-321.5-321.5S334.7 190.5 512 190.5 833.5 334.7 833.5 512 689.3 833.5 512 833.5z m0-571.5c-137.9 0-250 112.2-250 250s112.2 250.1 250 250.1c137.9 0 250-112.2 250-250.1S649.9 262 512 262zM512 142.9c-19.7 0-35.7-16-35.7-35.7V35.7C476.3 16 492.3 0 512 0c19.7 0 35.7 16 35.7 35.7v71.4c0 19.8-16 35.8-35.7 35.8zM512 1024c-19.7 0-35.7-16-35.7-35.7V893c0-19.7 16-35.7 35.7-35.7 19.7 0 35.7 16 35.7 35.7v95.3c0 19.7-16 35.7-35.7 35.7zM227 262.8c-9.1 0-18.3-3.5-25.3-10.5L150 200.5c-14-13.9-14-36.6 0-50.5 14-14 36.6-14 50.5 0l51.8 51.8c14 13.9 14 36.6 0 50.5-7 7-16.1 10.5-25.3 10.5zM848.8 884.5c-9.1 0-18.3-3.5-25.3-10.5l-51.8-51.8c-14-13.9-14-36.6 0-50.5 14-14 36.6-14 50.5 0l51.8 51.8c14 13.9 14 36.6 0 50.5-6.9 7-16.1 10.5-25.2 10.5zM107.2 547.7H35.7C16 547.7 0 531.7 0 512s16-35.7 35.7-35.7h71.4c19.7 0 35.7 16 35.7 35.7s-15.9 35.7-35.6 35.7zM988.3 547.7h-71.4c-19.7 0-35.7-16-35.7-35.7s16-35.7 35.7-35.7h71.4c19.7 0 35.7 16 35.7 35.7s-16 35.7-35.7 35.7zM175.2 884.5c-9.1 0-18.3-3.5-25.3-10.5-14-14-14-36.6 0-50.5l51.8-51.8c14-14 36.6-14 50.5 0 14 14 14 36.6 0 50.5L200.5 874c-7 7-16.1 10.5-25.3 10.5zM797 262.8c-9.1 0-18.3-3.5-25.3-10.5-14-14-14-36.6 0-50.5l51.8-51.8c14-14 36.6-14 50.5 0 14 14 14 36.6 0 50.5l-51.8 51.8c-7 7-16.1 10.5-25.2 10.5z"
                fill="#1296db" p-id="3575"></path>
            </svg>
            <span>上午号源</span>
          </div>
          <div class="docinfo" v-for="item in doctorData" :key="item.id" v-show="item.workTime==0">
            <div class="left">
              <div class="title">
                <div class="class">{{item.title}}</div>
                <div class="line">|</div>
                <div class="name">{{item.docname}}</div>
              </div>
              <div class="text">{{item.skill}}</div>
            </div>
            <div class="right">
              <div class="price">￥{{item.amount}}</div>
              <el-button type="primary" style="font-size:18px;width:150px;height:50px"
                @click="goNextStep(item)">剩余{{item.availableNumber}}</el-button>
            </div>
          </div>
        </div>
        <div class="x">
          <div class="title">
            <svg t="1690256437468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1533" width="32" height="32">
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db" p-id="1534"></path>
            </svg>
            <span>下午号源</span>
          </div>
          <div class="docinfo" v-for="item in doctorData" :key="item.id" v-show="item.workTime==1">
            <div class="left">
              <div class="title">
                <div class="class">{{item.title}}</div>
                <div class="line">|</div>
                <div class="name">{{item.docname}}</div>
              </div>
              <div class="text">{{item.skill}}</div>
            </div>
            <div class="right">
              <div class="price">￥{{item.amount}}</div>
              <el-button type="primary" style="font-size:18px;width:150px;height:50px"
                @click="goNextStep">剩余{{item.availableNumber}}</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital/index";
import type { HospitalWorkData, DoctorResponseData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";
let pageNo = ref<number>(1);
let limit = ref<number>(6);
let $route = useRoute();
let $router = useRouter();
let workData = ref<any>();
let workTime = ref<any>();
let doctorData = ref<any>();
let isActive = ref<number>(0);
const fetchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (result.code == 200) {
    workData.value = result.data;
    try {
      workData.value.bookingScheduleList.forEach((item: any, index: number) => {
        if (item.status == 0 && item.availableNumber > 0) {
          workTime.value = item.workDate;
          isActive.value = index;
          throw new Error("return");
        }
      });
    } catch (e: any) {
      if (e.message !== "return") throw e;
    }
    getDoctorWorkData();
  }
};
const getDoctorWorkData = async () => {
  let result: DoctorResponseData = await reqHospitalDoctor(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    workTime.value
  );
  if (result.code == 200) {
    doctorData.value = result.data;
  }
};
const changeTime = (item: any, index: number) => {
  console.log(item);
  workTime.value = item.workDate;
  isActive.value = index;
  getDoctorWorkData();
};
const goNextStep = (item: any) => {
  $router.push({ path: "register_step2", query: { docId: item.id } });
};
onMounted(() => {
  fetchWorkData();
});
</script>

<style scoped lang="scss">
.warp {
  color: #7f7f7f;
  .top {
    display: flex;
    margin: 80px 0 0 30px;
    font-size: 18px;
    .line,
    .dot {
      margin: 0 10px 0 10px;
    }
  }
  .center {
    margin: 50px 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .time {
      font-weight: 600;
      font-size: 18px;
    }
    .container {
      margin-top: 20px;
      display: flex;
      // width: 100%;
      float: left;
      .item {
        width: 200px;
        flex: 1;
        margin: 20px;
        border: 2px solid #c5c4c4;
        cursor: not-allowed;
        .top {
          background: #c5c4c4;
          display: flex;
          font-weight: 600;
          margin: 0;
          align-items: center;
          justify-content: center;
          height: 40px;
        }
        .bottom {
          height: 60px;
          display: flex;
          margin: 0;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        &.active {
          border: 2px solid rgb(49, 192, 248);
          cursor: pointer;
          color: rgb(1, 120, 205);
          .top {
            background: rgb(200, 239, 255);
          }
        }
        &.cur {
          transform: scale(1.15);
        }
      }
    }
  }
  .bottom {
    margin: 40px 0 100px 20px;
    .will {
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      line-height: 30px;
      .time {
        // font-size: 28px;
        color: rgb(1, 120, 205);
        line-height: 30px;
      }
    }
    .doctor {
      margin-left: 30px;
      .title {
        margin-top: 50px;
        font-size: 22px;
        display: flex;
        align-items: center;
        color: #1296db;
      }
      .docinfo {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #7f7f7f;
        margin: 10px 0 10px 0;
        .left {
          margin: 10px 0 10px 0;
          .title {
            margin: 10px 0 10px 0;
            display: flex;
            font-size: 20px;
            .line {
              margin: 0 10px 0 10px;
            }
          }
          .text {
            margin: 20px 0 10px 0;
          }
        }
        .right {
          display: flex;
          padding: 20px;
          .price {
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: center;
            margin-right: 50px;
          }
        }
      }
    }
  }
}
</style>