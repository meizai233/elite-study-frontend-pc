<template>
  <div class="header-container">
    <div class="header">
      <div class="center-tab">
        <!-- 路由 -->
        <NuxtLink class="logo" to="/">
          <img src="/images/logo.png" alt="优研平台" title="优研平台" />
        </NuxtLink>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/videoListPage">课程中心</NuxtLink>
      </div>
      <HeaderSearch />
      <NuxtLink v-show="isLogin" to="/personal" ml-20px>个人中心</NuxtLink>
      <div>
        <div v-if="isLogin" flexc>
          <a-dropdown>
            <div relative>
              <a-avatar :size="50" :src="personalInfo.head_img" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <span text-center>
                    <NuxtLink to="/personal">{{ personalInfo.username }}</NuxtLink>
                  </span>
                </a-menu-item>
                <a-menu-item>
                  <span text-center @click="userLogout()">退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div v-if="!isLogin" class="login-or-registry" flexc>
          <span mr-8 @click="loginModel = true">登录</span>
          <span class="register" @click="registerModel.base = true"> 注册 </span>
        </div>
      </div>
    </div>
    <!-- 注册弹窗 -->
    <RegModal @cancel="onCancel">
      <!-- 注册表单 -->
      <RegisterBase :registerCurrent="registerCurrent"></RegisterBase>
    </RegModal>
    <!-- 注册完成 -->
    <RegisterFinish></RegisterFinish>
    <Login />
    <Forget />
  </div>
</template>

<script setup>
let { registerModel, loginModel } = $(useModel());
const { personalInfo, isLogin, logout } = $(useUser());

// 定义注册的初始表单数据
const registerCurrent = reactive({
  phone: "",
  captcha: "",
  code: "",
  accept: false,
});
const onCancel = () => {
  (registerCurrent.phone = ""), (registerCurrent.captcha = ""), (registerCurrent.code = ""), (registerCurrent.accept = false);
};
const userLogout = function () {
  logout();
};
</script>

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
