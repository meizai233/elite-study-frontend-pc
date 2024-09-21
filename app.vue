<template>
  <NuxtLayout>
    <div @click="onClick" w-100px h100px bg-red>测试弹幕发送按钮</div>
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
import { io } from "socket.io-client";

// 建立传输链接 http://127.0.0.1:8888
const socket = io("ws://127.0.0.1:8888");
// 发送弹幕事件
const onClick = () => {
  socket.emit("bulletChat", "测试弹幕");
};

// 监听message事件
socket.on("message", (data) => {
  console.log("服务器发送的消息", data);
});

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
