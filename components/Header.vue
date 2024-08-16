<template>
  <div class="header-container">
    <div class="header">
      <div class="center-tab">
        <!-- 路由 -->
        <NuxtLink class="logo" to="/">
          <img src="/images/logo.png" alt="优研平台" title="优研平台" />
        </NuxtLink>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink>课程中心</NuxtLink>
        <a target="_blank">云服务器</a>
      </div>
      <HeaderSearch />
      <div>
        <div class="login-or-registry" flexc>
          <span mr-8>登录</span>
          <span class="register"> 注册 </span>
        </div>
      </div>
    </div>
    <RegModal>
      <RegisterBase></RegisterBase>
    </RegModal>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.header-container {
  display: flex;
  flex-basis: 1200px;
  min-width: 1200px;
  height: 67px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 0px 5px 0px #d7d7d7;
}
.header {
  flex-basis: 1200px;
  display: flex;
  height: 72px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;

  .center-tab {
    flex: 0.6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #4f555d;

    &:hover {
      color: #f38e48;
    }
  }
  & > * {
    cursor: pointer;
    user-select: none;
  }

  .logo img {
    width: 180px;
    height: 63px;
    line-height: 62px;
    font-size: 0;
  }
}

.register {
  background-color: #4d555d;
  padding: 2px;
  width: 60px;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 26px;
}
</style>
