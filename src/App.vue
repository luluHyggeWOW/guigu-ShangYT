<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
    <Login></Login>
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
    min-height: 86vh;
  }
}
</style>