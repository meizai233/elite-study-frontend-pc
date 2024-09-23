import { IUserInfo, IPage, IPlayRecord } from "~/types/api";

/**
 * 注册接口
 * @param params code:验证码 phone:手机号
 */
export const register = async (params: { code: string; phone: string }) => {
  return await useApi<null>("/user/v1/register", {
    method: "post",
    body: params,
  });
};

/**
 * 登录接口
 * @param params code:验证码 phone:手机号 password:密码
 */
export const login = async (params: { phone: string; code?: string; password?: string }) => {
  return await useApi<string>("/user/v1/login", {
    method: "post",
    body: params,
  });
};

/**
 * 修改密码接口
 * @param params code:验证码 phone:手机号 password:密码
 */
export const forget = async (params: { phone: string; code: string; password: string }) => {
  return await useApi<null>("/user/v1/forget", {
    method: "post",
    body: params,
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = async function () {
  return await useApi<IUserInfo>("/user/v1/detail");
};
/**
 * 获取最近播放记录数据
 * @param params size: 每页条数, page: 页码
 */
export const getPlayRrecord = async function (params: { page: number; size: number }) {
  return await useApi<IPage<IPlayRecord>>("/user/v1/play_record", {
    method: "post",
    body: params,
  });
};
/**
 * 修改个人信息
 */
export const updateUserInfo = async function (params: any) {
  return await useApi<null>("/user/v1/update", {
    method: "POST",
    body: params,
  });
};
