/**
 * pm2运行的配置文件
 */
module.exports = {
  apps: [
    {
      name: 'frontend-course-pc', // 项目名字
      exex_mode: 'cluster', // 生产模式
      instances: 'max', // 全功率运行
      script: './.output/server/index.mjs' // 执行的入口文件
    }
  ]
}