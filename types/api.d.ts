/**
 * 接口返回基本数据类型
 */

export interface IApiBase<T> {
  code: number;
  msg: string;
  data: T;
}
/**
 * 课程分类接口返回参数
 */
export interface ICategoryList {
  id: number;
  name: string;
  pid: number;
  gmt_create: string;
  gmt_modified: string;
  level: null;
  subCategoryList?: ICategoryList[];
}
/**
 * 轮播图接口返回参数
 */
export interface IBanner {
  id: number;
  location: string;
  name: string;
  img_url: string;
  pc_link: string;
  h5_link: string;
  expired: string;
  del: number;
  gmt_create: string;
  gmt_modified: string;
}
/**
 * 个人信息接口返回
 */
export interface IUserInfo {
  id: number;
  username: string;
  head_img: string;
  phone: string;
  pwd: string;
  position: null;
  slogan: string;
  sex: string;
  city: null;
  role: null;
  learn_time: null;
  vip_rank: number;
  vip_expired: null;
  gmt_create: string;
  gmt_modified: string;
  disabled: null;
  openid: null;
  unionid: null;
}
