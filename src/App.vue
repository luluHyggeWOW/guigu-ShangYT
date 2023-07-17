<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
  </div>

</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.container {
  width: 100wh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 90%;
    // height: 120vh;
    margin-top: 79px;
  }
}
</style>