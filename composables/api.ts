import { $fetch } from "ohmyfetch";
import type { FetchRequest, FetchOptions } from "ohmyfetch";
import { message } from "ant-design-vue";
import { IApiBase } from "~~/types/api";

export const baseUrl = "http://127.0.0.1:8888/api";

const _useApi = $fetch.create({
  baseURL: baseUrl,
  // 请求拦截器
  async onRequest() {
    // 请求头传如token
  },

  // 响应拦截器
  async onResponse({ response }) {
    // 接口请求异常捕获
    // 根据不同的返回状态码，返回不同的提示信息
    const data = response._data;
    if (data.code !== 0) {
      message.error(data.msg);
    }
  },
});

export const useApi = async function <T = any>(request: FetchRequest, options?: FetchOptions<"json">) {
  return await _useApi<IApiBase<T>>(request, options);
};
