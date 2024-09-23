import type { IDanmu } from "~/types/api";

/**
 * 查询集弹幕列表
 * @param params 请求参数 { beginTime: 开始时间, endTime: 结束时间, productId: 视频id, episodeId: 章节id }
 */
export const listByEpisodeId = async function (params: { beginTime: number; endTime: number; productId: number; episodeId: number }) {
  return await useApi<IDanmu[]>("/barrage/v1/list_by_episode", {
    method: "POST",
    body: params,
  });
};

/**
 * 发送弹幕
 * @param params 请求参数 { productId: 视频id, episodeId: 章节id, content: 弹幕内容, playTime: 播放时间 }
 */
export const addDanmu = async function (params: { productId: number; episodeId: number; content: string; playTime: number }) {
  return await useApi<any>("/barrage/v1/add", {
    method: "POST",
    body: params,
  });
};
