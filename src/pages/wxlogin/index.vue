<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { SET_TOKEN } from "@/utils/user";
let $route = useRoute();
let userStore = useUserStore();
SET_TOKEN(JSON.stringify($route.query));
let html: any = document.querySelector("html");
html.style.display = "none";
</script>

<style scoped>
</style>