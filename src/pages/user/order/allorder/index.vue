<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>挂号订单</h1>
      </div>
    </template>
    <div class="top">
      <el-form inline="true">
        <el-form-item prop=" " label="就诊人：">
          <el-select placeholder="请选就诊人" v-model="patientId" @change="getData">
            <el-option label="全部就诊人" value=""></el-option>
            <el-option :label="item.name" :value="item.id" v-for="item in allUser" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="getData">
            <el-option label="全部订单状态" value=""></el-option>
            <el-option :label="item.comment" :value="item.status" v-for="(item,index) in allOrderState"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="allOrderArr">
        <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
        <el-table-column label="医院" prop="hosname"></el-table-column>
        <el-table-column label="科室" prop="depname"></el-table-column>
        <el-table-column label="医生" prop="title"></el-table-column>
        <el-table-column label="服务费" prop="amount"></el-table-column>
        <el-table-column label="就诊人" prop="patientName"></el-table-column>
        <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default={row}>
            <el-button type="text" @click="goDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :small="small" :disabled="disabled" :background="true" layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total" @size-change="handlerSizeChange" @current-change="getOrderInfo" style="margin:10px" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
import { onMounted, ref } from "vue";
import { reqUserOrderInfo, reqAllUser, reqOrderState } from "@/api/user/index";
import type {
  UserOrderInfoResponseData,
  Records,
  AllUser,
  AllOrderStateResponseData,
  AllOrderState,
  AllUserResponseData,
} from "@/api/user/type";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
//@ts-ignore
import QRCode from "qrcode";
let $route = useRoute();
let $router = useRouter();
let hospitalStore = useDetailStore();
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(100);
let patientId = ref<string>("");
let orderStatus = ref<string>("");
let allOrderArr = ref<Records>();
let allUser = ref<AllUser>();
let allOrderState = ref<AllOrderState>();
const getOrderInfo = async () => {
  let result: UserOrderInfoResponseData = await reqUserOrderInfo(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    allOrderArr.value = result.data.records;
    total.value = result.data.total;
  }
};
const goDetail = (row: any) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};
const handlerSizeChange = (pageSizes: number) => {
  pageSize.value = pageSizes;
  getOrderInfo();
};
const getData = async () => {
  let result1: AllUserResponseData = await reqAllUser();
  let result2: AllOrderStateResponseData = await reqOrderState();
  if (result1.code == 200) {
    allUser.value = result1.data;
  }
  if (result2.code == 200) {
    allOrderState.value = result2.data;
  }
};

onMounted(() => {
  getOrderInfo();
  getData();
});
</script>

<style scoped lang="scss">
.box-card {
  margin: 50px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 24px;
      margin: 10px;
    }
  }
  .top {
    .tag {
      // width: 150px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      margin-left: 20px;
      svg {
        position: absolute;
        height: 16px;
      }
      span {
        font-size: 13px;
        line-height: 16px;
        margin-top: -3px;
        margin-left: 20px;
      }
    }
    .right {
      float: right;
      display: flex;
      img {
        width: 30px;
        height: 30px;
      }
      div {
        svg {
          height: 12px;
        }
        font-size: 13px;
      }
    }
  }
  .bottom {
    margin-top: 25px;
    border-top: 1px solid #e6e4e4;
    display: flex;
    .left {
      flex: 4;
      font-size: 23px;
      margin: 20px;
    }
    .right {
      flex: 6;
      .box-card {
        margin: 20px;
        p {
          font-size: 15px;
          line-height: 22px;
        }
      }
      .code {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .btn {
      float: right;
      margin-top: 60px;
    }
  }
}
</style>