import type { IHotProduct, IDuration } from "~/types/api";

/**
 * 获取热门商品榜数据
 */
export const getHotProduct = async function () {
  return await useApi<IHotProduct[]>("/rank/v1/hot_product");
};

/**
 * 获取卷王排行榜数据
 */
export const getDuration = async function () {
  return await useApi<IDuration[]>("/rank/v1/duration");
};
