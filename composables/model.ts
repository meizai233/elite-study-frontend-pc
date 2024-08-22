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
  // 登录弹窗
  const loginModel = ref(false);

  return {
    registerModel,
    changeToFinish,
    loginModel,
  };
});
