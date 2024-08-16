import { $fetch } from "ohmyfetch";
import type { FetchRequest, FetchOptions } from "ohmyfetch";

export const baseUrl = "http://127.0.0.1:8081";

const _useApi = $fetch.create({
  baseURL: baseUrl,
  // 请求拦截器
  async onRequest() {
    // 请求头传如token
  },

  // 响应拦截器
  async onResponse() {
    // 接口请求异常捕获
    // 根据不同的返回状态码，返回不同的提示信息
  },
});

export const useApi = async function (request: FetchRequest, options?: FetchOptions<"json">) {
  return await _useApi(request, options);
};
