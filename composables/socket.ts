import { io } from "socket.io-client";
import { defineStore } from "pinia";

export const useSocket = defineStore("socket", () => {
  let socket = $ref(null);
  let videoDanmuList = $ref([]);
  const initialize = () => {
    // 建立传输链接 http://127.0.0.1:8888
    socket = io("ws://127.0.0.1:8888");
    socket.on("connect", () => {
      // console.log("socketio已连接");
    });
    onBulletChat();
  };

  const handleAddDanmu = (data: any) => {
    socket.emit("bulletChat", data);
  };

  // 待办 这个也没用上
  const onBulletChat = () => {
    // 监听bulletChat事件
    // 监听message事件 触发时增加弹幕过来
    socket.on("message", (data) => {
      videoDanmuList.push(data);
    });
  };

  return {
    videoDanmuList,
    initialize,
    handleAddDanmu,
  };
});
