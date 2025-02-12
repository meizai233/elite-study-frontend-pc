## 精简版整理

## 细化 功能不需要太多 要求每个点都能自己说的很清楚

## 实现功能

- github 第三方授权功能，
- 实现用户登录功能（包含密码验证 短信验证 github 第三方授权登陆）
  - 短信验证是否做了防抖设计？
- 结合华为云 oss 实现实时弹幕播放
- 实现基础界面
- 视频播放、弹幕功能、排行榜
- 自动化部署 运维
  - forever+nodemon 持续运行 node 输出 logs

前端技术栈：Nuxt3+Vue3+Pinia+Ant-Design+Unocss

后端技术栈：Express+Sequelize+Mysql+Redis

第三方服务：Nginx+OSS+视频点播服务+VideoJS（这块还不确定）

## 作为简历

1. Node 实现 github 登陆 Outh2 登陆流程，封装第三方短信运营商 SDK 发送短信 +结合 Redis 实现原子性仿重提交【这啥？】
2. 实现弹幕模块：Redis 的发布订阅模式 + websocket + Socket.io 实现【感觉这里我自己都没有很懂。。】
3. 榜单排行榜开发：结合 Redis Sorted Set 结构实现用户学习榜单+热门课程榜单:
4. 性能优化：将图片上传至 OSS 存储+图片格式压缩+懒加载
5. DevOps 自动化构建 CICD 流水线:Docker+Gitee Go+阿里云 ECS 实现项目一键部署
6. Nuxt3 框架开发项目:实现服务端渲染，SEO 优化【渲染在哪里 优化在哪里】

##
