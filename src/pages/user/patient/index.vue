<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>就诊人管理</h1>
        <el-button type="success" @click="addUser" :icon="User">添加就诊人</el-button>
      </div>
    </template>
    <div class="user" v-if="scene==0">
      <Visitor @changeScene="changeScene" v-for="(user,index) in userArr" :key="user.id" :user="user" class="item"
        :index="index" :currentIndex="currentIndex" @getAllUser="fetchUserData" />
    </div>
    <div class="form" v-else>
      <el-form label-width="100" class="elform">
        <el-divider>就诊人信息</el-divider>
        <el-form-item class="elformitem" label="用户姓名：">
          <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item class="elformitem" label="证件类型：">
          <el-select placeholder="请选择证件类型" v-model="userParams.certificatesType" style="width:100%">
            <el-option :label="item.name" :value="item.value" v-for="item in certationArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="elformitem" label="证件号码：">
          <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item class="elformitem" label="用户性别：">
          <el-radio-group class="ml-4" v-model="userParams.sex">
            <el-radio label="1" size="large">男</el-radio>
            <el-radio label="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="elformitem" label="出生日期：">
          <el-date-picker type="date" placeholder="请选择日期" v-model="userParams.birthdate" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item class="elformitem" label="手机号码：">
          <el-input placeholder="请输入手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100" class="elform">
        <el-divider>建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form-item class="elformitem" label="婚姻状况：">
          <el-radio-group class="ml-4" v-model="userParams.isMarry">
            <el-radio label="1" size="large">已婚</el-radio>
            <el-radio label="0" size="large">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="elformitem" label="自费/医保：">
          <el-radio-group class="ml-4" v-model="userParams.isInsure">
            <el-radio label="1" size="large">自费</el-radio>
            <el-radio label="0" size="large">医保</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form label-width="100" class="elform">
        <el-divider>当前的住址</el-divider>
        <el-form-item class="elformitem" label="用户地址：">
          <el-cascader :props="props" v-model="userParams.addressSelected" />
        </el-form-item>
        <el-form-item class="elformitem" label="详细地址：">
          <el-input placeholder="请输入详细地址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100" class="elform">
        <el-divider>联系人信息（选填）</el-divider>
        <el-form-item class="elformitem" label="用户姓名：">
          <el-input placeholder="请输入用户姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item class="elformitem" label="证件类型：">
          <el-select placeholder="请选择证件类型" style="width:100%" v-model="userParams.contactsCertificatesType">
            <el-option :label="item.name" :value="item.value" v-for="item in certationArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="elformitem" label="证件号码：">
          <el-input placeholder="请输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item class="elformitem" label="手机号码：">
          <el-input placeholder="请输入手机号码" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item class="elformitem">
          <el-button type="" @click="scene=0">取消</el-button>
          <el-button type="" @click="reset">重写</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//@ts-ignore
import Visitor from "@/pages/hospital/register/visitor.vue";
import type { UserArr, UserResponseData } from "@/api/hospital/type";
import type {
  CertationTypeResponseData,
  CertationArr,
  AddOrUpdateUser,
} from "@/api/user/type";
import { User } from "@element-plus/icons-vue";
import { reqGetUser } from "@/api/hospital/index";
import {
  reqAddOrUpdataUser,
  reqCertationType,
  reqCity,
} from "@/api/user/index";
import { ref, onMounted, reactive } from "vue";
import { CascaderProps, ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let userArr = ref<UserArr>([]);
let scene = ref<number>(0);
let certationArr = ref<CertationArr>();
let userParams = reactive<AddOrUpdateUser>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
const fetchUserData = async () => {
  let result: UserResponseData = await reqGetUser();
  if (result.code == 200) {
    userArr.value = result.data;
  }
};
const addUser = () => {
  scene.value = 1;
  reset();
};
const changeScene = (user: any) => {
  scene.value = 1;
  Object.assign(userParams, user);
};
const getCertationType = async () => {
  let result: CertationTypeResponseData = await reqCertationType();
  if (result.code == 200) {
    certationArr.value = result.data;
  }
};
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let result: any = await reqCity((node?.data?.id as string) || "86");
    if (result.code == 200) {
      let showData = result.data.map((item: any) => {
        return {
          id: item.id,
          label: item.name,
          value: item.value,
          leaf: !item.hasChildren,
        };
      });
      console.log(showData);
      resolve(showData);
    }
  },
};
const submit = async () => {
  console.log(userParams);
  let result: any = await reqAddOrUpdataUser(userParams);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });
    if ($route.query.type == "add") {
      $router.back();
    } else {
      scene.value = 0;
      fetchUserData();
    }
  } else {
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "添加失败",
    });
  }
};
const reset = () => {
  Object.assign(userParams, {
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};
onMounted(() => {
  fetchUserData();
  getCertationType();
  if ($route.query.type == "add") {
    scene.value = 1;
  } else if ($route.query.type == "edit") {
    Object.assign(userParams, userStore.patientInfo);
    console.log(userParams);
    scene.value = 1;
  }
});
</script>

<style scoped lang="scss">
.box-card {
  margin: 40px 0;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 24px;
      margin: 10px;
    }
  }
  .user {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 23%;
      margin: 1%;
    }
  }
  .form {
    .elform {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .elformitem {
        width: 40%;
      }
    }
  }
}
.btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  .btnn {
    width: 200px;
  }
}
</style>