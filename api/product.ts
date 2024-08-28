import { IPoductQuery } from "~/types/api";

/**
 * 根据类别ID或其他参数查询产品。
 *
 * @param {Object} params - 查询参数。
 * @param {number} params.page - 分页的页码。
 * @param {number} params.size - 每页产品数量。
 * @param {number} [params.cid] - 用于筛选产品的分类ID。
 * @param {number} [params.cpid] - 用于筛选产品的方向ID。
 */

export const queryProductByCid = async function (params: { page: number; size: number; cid?: number; cpid?: number }) {
  return await useApi<IPoductQuery>("/product/v1/query_by_cid", {
    method: "POST",
    body: params,
  });
};
