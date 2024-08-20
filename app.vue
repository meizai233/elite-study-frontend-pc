<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 待办 为什么要引入这个
import "ant-design-vue/es/message/style/css";

useHead({
  title: "优研平台",
  meta: [
    { name: "description", content: "优研平台的网站" },
    { name: "keywords", content: "数学与科学，人文学科，语言学习" },
  ],
});
</script>

<style lang="less" scoped></style>
