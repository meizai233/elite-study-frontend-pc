## 项目简介

前端项目 + 后端项目

## 技术栈

前端 pc 界面

- Nuxt + Unocss
  后端
- Node + Express + Sequelize + MySQL + Redis + RabbitMQ

小程序端

- uni-app + vue3 + pinia

## 目标功能

- [x] 有效期内验证码 - 缓存至 redis
- [x] 手机短信验证码登录
- [x] 用户注册模块
- [x] 用户登录模块（密码验证和短信验证）
- [x] github workflow 实现前后端自动化集成和部署（dockerFile + yml 配置文件 + nginx + docker-compose）
- [x] 搜索功能防抖
- [ ] 将本地图片请求实现 CDN 加速
- [ ] 用户上传头像至阿里云 OSS，动静分离，加速图片加载
- [x] 视频点播 播放视频
- [ ] 上报学习时长 形成用户时长统计记录
- [ ] 实时视频弹幕
- [ ] 弹幕随视频加载、暂停，开关弹幕
- [ ] 后台管理系统
  - [ ] 管理员权限控制

## 技术实现

- [x] 封装统一样式的卡片分类公共组件
- [x] 前后端分页查询

### 用户注册流程

- /api/notify/v1/captcha?type=register 图形验证接口 获取图形验证码
- /api/notify/v1/send_code 短信验证接口 获取短信（判断 1 图形验证码未过期且验证码正确 2 短信验证码过期或未发送的情况下才发送
- "/api/user/v1/register 注册接口 通过用户和短信注册

### 返回值（code, msg, data）统一管理工具类

- BackCode 类
  - 统一封装状态成功/失败的 res 格式
- CodeEnum
  - 存储不同错误的状态码和 msg
