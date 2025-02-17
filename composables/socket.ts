import { io } from "socket.io-client";
import { defineStore } from "pinia";

export const useSocket = defineStore("socket", () => {
  let socket = $ref(null);
  let videoDanmuList = $ref([]);
  let heartbeatTimer = $ref<NodeJS.Timer | null>(null);
  let getDuration = () => 0; // 默认回调函数

  const initialize = () => {
    const { token } = $(useUser());
    // 建立传输链接 http://127.0.0.1
    // wss://elitestudy.fun
    socket = io("ws://127.0.0.1:8888", {
      auth: {
        token,
      },
      transports: ["websocket", "pooling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    }); // 如果WebSocket在根路径

    // 连接事件
    socket.on("connect", () => {
      console.log("socket connected");
      startHeartbeat();
      onBulletChat();
    });

    // 断开连接事件
    socket.on("disconnect", (reason) => {
      console.log("socket disconnected:", reason);
      stopHeartbeat();
      saveLocalProgress();
    });
  };

  const handleAddDanmu = (data: any) => {
    socket.emit("bulletChat", data);
  };

  const onBulletChat = () => {
    // 监听bulletChat事件
    // 监听message事件 触发时增加弹幕过来
    socket.on("message", (data) => {
      videoDanmuList.push(data);
    });
  };

  const startHeartbeat = (productId?: number, episodeId?: number, getDurationCallback?: () => number) => {
    if (heartbeatTimer || !socket) return;

    // 保存获取时长的回调
    if (getDurationCallback) {
      getDuration = getDurationCallback;
    }

    // 制定一个interval 每30s发送一次
    heartbeatTimer = setInterval(() => {
      if (!socket?.connected) return;
      const currentDuration = getDuration(); // 实时获取当前播放时长

      // 前端发送心跳时
      socket.emit("heartbeat", {
        productId: productId, // 课程ID
        episodeId: episodeId, // 章节ID
        duration: currentDuration,
        // timestamp: Date.now()
      });
    }, 10000);
  };

  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  };

  // 本地进度保存
  const saveLocalProgress = (duration?: number) => {
    const currentProgress = {
      duration: duration,
      timestamp: Date.now(),
    };
    localStorage.setItem("lastProgress", JSON.stringify(currentProgress));
  };

  // 组件卸载时清理
  const cleanup = () => {
    stopHeartbeat();
    socket?.disconnect();
    socket = null;
  };

  return {
    videoDanmuList,
    initialize,
    saveLocalProgress,
    handleAddDanmu,
    startHeartbeat,
    stopHeartbeat,
    cleanup,
  };
});
