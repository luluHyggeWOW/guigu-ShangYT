<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>

      </div>
    </template>
    <div class="tip">
      <p><el-icon>
          <InfoFilled />
        </el-icon>完成实名后才能添加就诊人，正常进行挂号，为了不影响后序步骤，建议提前实名认证</p>
    </div>
    <el-descriptions :column="1" border v-if="userInfo?.authStatus==1">
      <el-descriptions-item label="用户姓名：" align="center">{{userInfo?.name}}</el-descriptions-item>
      <el-descriptions-item label="身份证件："
        align="center">{{userInfo?.certificatesType=='10'?'身份证':'户口本'}}</el-descriptions-item>
      <el-descriptions-item label="证件号码：" align="center">{{userInfo?.certificatesNo}}</el-descriptions-item>
    </el-descriptions>
    <el-form v-else ref="form" style="width:50%;margin:20px auto;" :rules="rules" :model="userParams">
      <el-form-item prop="name" label="用户姓名：">
        <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
      </el-form-item>
      <el-form-item prop="certificatesType" label="证件类型：">
        <el-select placeholder="请选择证件类型" style="width:100%" v-model="userParams.certificatesType">
          <el-option :label="item.name" :value="item.value" v-for="item in arrType" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="certificatesNo" label="证件号码：">
        <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"></el-input>
      </el-form-item>
      <el-form-item prop="certificatesUrl" label="证件照片：">
        <el-upload ref="upload" action="/api/oss/file/fileUpload?fileHost=userAuah" :limit="1" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="handleExceed"
          :on-success="handleAvatarSuccess">
          <img src="../../../assets/images/auth_example.png" style="width:100%;height:80%" alt="">
        </el-upload>
        <el-dialog v-model="dialogVisible" width="50%">
          <img w-full :src="userParams.certificatesUrl" alt="Preview Image"
            style=" max-height:350px;width:100%;height:100%" />
        </el-dialog>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="reset">重写</el-button>
        <el-button type="primary" @click="sumbit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
import { InfoFilled } from "@element-plus/icons-vue";
import {
  reqUserInfo,
  reqCertationType,
  reqUserCertation,
} from "@/api/user/index";
import type {
  UserInfoResponseData,
  UserInfo,
  CertationArr,
  CertationTypeResponseData,
  UserParams,
} from "@/api/user/type";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
let hospitalStore = useDetailStore();
let userInfo = ref<UserInfo>();
let arrType = ref<CertationArr>([]);
let userParams = reactive<UserParams>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});
let dialogVisible = ref<boolean>(false);
let upload = ref();
let form = ref();
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqUserInfo();
  if (result.code == 200) {
    userInfo.value = result.data;
    if (userInfo.value.authStatus == 0) {
      getType();
    }
  }
};
const getType = async () => {
  let result: CertationTypeResponseData = await reqCertationType();
  if (result.code == 200) {
    arrType.value = result.data;
  }
};
const handleAvatarSuccess = (response: any, uploadFile: any) => {
  form.value.clearValidate("");
  userParams.certificatesUrl = response.data;
};
const handleExceed = () => {
  ElMessage.error("只能上传一张图片");
};
const handlePictureCardPreview = (uploadFile: any) => {
  dialogVisible.value = true;
};
const handleRemove = () => {
  userParams.certificatesUrl = "";
};
const reset = () => {
  Object.assign(userParams, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
  upload.value.clearFiles();
};
const sumbit = async () => {
  await form.value.validate();
  let result: any = await reqUserCertation(userParams);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "认证成功" });
  } else {
    ElMessage({ type: "error", message: "认证失败" });
  }
};
const validateName = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("请输入正确的姓名"));
  } else {
    callback();
  }
};
const validateCertificatesNo = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("请输入正确的证件号"));
  } else {
    callback();
  }
};
const validateCertificatesType = (rule: any, value: any, callback: any) => {
  if (value == "10" || value == "20") {
    callback();
  } else {
    callback(new Error("请选择证件类型"));
  }
};
const validateCertificatesUrl = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("请输上传证件照"));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [{ validator: validateName, trigger: "blur", required: true }],
  certificatesNo: [
    { validator: validateCertificatesNo, trigger: "blur", required: true },
  ],
  certificatesType: [
    { validator: validateCertificatesType, trigger: "blur", required: true },
  ],
  certificatesUrl: [
    { validator: validateCertificatesUrl, trigger: "blur", required: true },
  ],
});
onMounted(() => {
  getUserInfo();
  getType();
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
  .tip {
    color: #7f7f7f;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>