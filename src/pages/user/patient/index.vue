<template>
  <div class="notice">
    <h1>{{hospitalStore.hospitalInfo.hospital?.hosname}}</h1>
    <div class="title">为方便您早日就医康复，请您认真阅读预约挂号须知：</div>
    <div class="info">
      <div class="title">一、预约实名制</div>
      <div class="text">统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号(身份证、护照)、性别、手机号码。
        社保卡号等基本信息</div>
      <div class="title">二、预约挂号</div>
      <div class="text" style="margin:20px 0 20px 0">按照北京市卫健委统一平台要求，预约挂号规则如下:</div>
      <div class="text">在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源;</div>
      <div class="text">在同一自然周，同一就诊人，可以预约最多8个号源;</div>
      <div class="text">在同一自然月，同一就诊人，可以预约最多12个号源;</div>
      <div class="text"> 在同一自然季度，同一就诊人，可以预约最多24个号源。</div>
      <div class="title">三、取消预约</div>
      <div class="text">已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</div>
      <div class="title">四、爽约处理</div>
      <div class="text" style="margin:20px 0 20px 0">如预约成功后果者未能按时疏诊目不办理取消而约号现为赛约，同一更者在目然年内赛约现则如下:</div>
      <div class="text">景计要约3次，90天内不允许通过114平合进行预约挂号;</div>
      <div class="text">累计爽约6次目6次爽约日起180天内不允许通过114平台进行预约挂号</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospital";
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.notice {
  margin: 50px;
  font-size: 18px;
  h1 {
    display: flex;
    font-size: 30px;
    justify-content: center;
  }
  .title {
    color: #7f7f77;
    margin-top: 20px;
  }
  .info {
    div {
      color: #7f7f77;
      line-height: 20px;
    }
    .title {
      font-weight: 600;
      margin: 20px 0 20px 0;
    }
  }
}
</style>