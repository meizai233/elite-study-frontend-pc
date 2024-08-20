import { useApi } from "../composables/api";

/**
 * 发送手机短信验证码
 * @param phone 手机号
 * @param captcha 图形验证码
 * @param type 场景
 */
export const sendCode = async (phone: string, captcha: string, type: "register" | "login") => {
  return await useApi("/notify/v1/send_code", {
    method: "post",
    body: { phone, captcha, type },
  });
};
