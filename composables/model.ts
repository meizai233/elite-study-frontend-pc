/**
 * 全局状态控制
 */

import { defineStore } from "pinia";

export const useModel = defineStore("model", () => {
  // 注册框是否展示
  const registerModel = reactive({
    base: false, // 注册初始页
    finish: false, // 注册成功页
  });

  // 注册成功跳转完成页
  const changeToFinish = () => {
    registerModel.base = false;
    registerModel.finish = true;
  };

  // 忘记密码框
  const forgetModel = reactive({
    first: false,
    second: false,
    phoneCache: "", //临时缓存手机号码
  });

  // 打开忘记密码弹窗
  const changeToForget = () => {
    loginModel.value = false;
    forgetModel.first = true;
  };

  // 切换忘记密码（修改密码）到第二步骤（接受验证码）
  const switchForget = () => {
    forgetModel.first = !forgetModel.first;
    forgetModel.second = !forgetModel.second;
  };

  // 登录弹窗
  const loginModel = ref(false);

  return {
    registerModel,
    changeToFinish,
    loginModel,
    forgetModel,
    changeToForget,
    switchForget,
  };
});
