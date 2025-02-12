FROM docker.1ms.run/node:18
#复制文件
WORKDIR /app
COPY package*.json ./

# 安装
RUN npm set registry https://registry.npmmirror.com 
# RUN yarn config set registry https://registry.yarnpkg.com/
RUN yarn config set registry https://registry.npmmirror.com/
RUN yarn cache clean
RUN npm install --registry https://registry.npmmirror.com/
RUN npm run build
RUN npm i pm2 -g

# 启动
EXPOSE 3000
# docker中监测不到pm2后台运行，需要用pm2-runtime命令运行
CMD ["pm2-runtime","start","ecosystem.config.js"]