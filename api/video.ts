import type { IVideoList } from "~/types/api";

/**
 * 视频源
 */
export const getVideo = async function (params: { episodeId: number }) {
  return await useApi<IVideoList>("/getPlayUrl/v1/get_play_url", {
    method: "post",
    body: {
      ...params,
    },
  });
};
