/**
 * 获取卡片列表
 */
export const getSearchList = async function (params: {
  title: string;
  page?: number;
  size?: number;
}) {
  return await useApi<any>('/search/v1/list', {
    params,
  });
};

