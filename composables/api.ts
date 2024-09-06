import { $fetch } from "ohmyfetch";
import type { FetchRequest, FetchOptions } from "ohmyfetch";
import { message } from "ant-design-vue";
import { IApiBase } from "~~/types/api";

// 部署上云
// 待办 这里如何确定分发到api了 https可以访问吗
export const baseUrl = "https://elitestudy.fun/api";

const _useApi = $fetch.create({
  baseURL: baseUrl,
  // 请求拦截器
  async onRequest({ options }) {
    const { token } = $(useUser());
    options.headers = new Headers(options.headers);
    if (token) options.headers.set("authorization", token);
  },

  // 响应拦截器
  async onResponse({ response }) {
    // 接口请求异常捕获
    // 根据不同的返回状态码，返回不同的提示信息
    const data = response._data;
    if (data.code !== 0) {
      if (data.code === 270004) return;
      if (data.code === 250004) return;
      if (data.code === 280001) return;

      message.error(data.msg);
    }
  },
});

export const useApi = async function <T = any>(request: FetchRequest, options?: FetchOptions<"json">) {
  return await _useApi<IApiBase<T>>(request, options);
};
