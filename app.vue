<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>

<script setup>
// 待办 为什么要引入css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/notification/style/css";

const { asyncUserInfo } = $(useUser());
// 同步用户数据
await asyncUserInfo();

useHead({
  title: "优研平台",
  meta: [
    { name: "description", content: "优研平台的网站" },
    { name: "keywords", content: "数学与科学，人文学科，语言学习" },
  ],
});
</script>

<style lang="less" scoped>
@import "~/assets/reset.less";
</style>
