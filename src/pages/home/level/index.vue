<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hp">
        <li class="active">全部</li>
        <li>全部</li>
        <li>全部</li>
        <li>全部</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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