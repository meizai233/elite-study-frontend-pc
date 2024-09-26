<script setup lang="ts">
import { getGitHubOauth } from "~~/api/github";

// 登录github
const loginGithub = async () => {
  const link = await getGitHubOauth();
  window.location.href = link;
  // 还是redirect到首页 但是右上角有学员信息 触发登录toast
  // 但是这依靠后端重定向 怎么把数据传给前端？
};
</script>

<template>
  <div class="oAuthLogin">
    <img src="/images/github.png" w-70px h-70px @click="loginGithub()" />
  </div>
</template>

<style lang="less" scoped>
.oAuthLogin {
  display: flex;
  margin-top: 12px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  & > * {
    padding: 8px;
    margin: 0 20px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 50%;
  }

  .wechat {
    color: #00c86a;
    background-color: #e1ffe0;
  }
}
</style>
