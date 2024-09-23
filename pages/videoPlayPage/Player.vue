import { pushScopeId } from 'nuxt/dist/app/compat/capi';
<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { IChapter } from "~/types/api";
import vueDanmaku from "vue3-danmaku/dist/vue3-danmaku.esm";
import { listByEpisodeId, addDanmu } from "~/api/bulletScreen";

const { productId, episodeId, chapterList } = defineProps<{
  productId: number;
  episodeId: number;
  chapterList: any;
}>();

const emit = defineEmits<{
  (e: "getVideoData", value: number): void;
}>();

/**
 * 弹幕逻辑
 */
let danmakuRef = $ref<InstanceType<typeof vueDanmaku>>();
let danmuTimer = $ref<NodeJS.Timer>();
let oVideoPlayer: HTMLVideoElement;
let danmuList = $ref([]);

async function getDanmuData(push?: boolean) {
  const currentTime = Math.floor(oVideoPlayer.currentTime);

  if (!push) {
    danmuList = (
      await listByEpisodeId({
        productId: productId,
        episodeId: episodeId,
        endTime: currentTime + 10,
        beginTime: currentTime,
      })
    ).data;
  } else {
    await listByEpisodeId({
      productId: productId,
      episodeId: episodeId,
      endTime: currentTime + 10,
      beginTime: currentTime,
    }).then((item) => {
      // 请求弹幕并推送到弹幕list
      item.data.map((subItem) => danmakuRef.push(subItem));
    });
  }
}

/**
 * 实例化播放器
 */
let speed = false;
let oVideo: HTMLVideoElement; // 获取video DOM
let oDanmu: HTMLDivElement; // 获取弹幕 DOM
let myPlay = $ref(null);
let init = $ref(false); //控制弹幕展示时机 初始化为false
let player: videojs.Player | null = null;
// 获取缓存中的播放速度，否则为1
let playBackRate = $ref(process.client ? (localStorage.getItem("playBackRate") ? Number(localStorage.getItem("playBackRate")) : 1) : 1);

let newPlayer = async (playSrc: string) => {
  if (process.server) return;
  if (!player) {
    await import("videojs-hotkeys");
    player = videojs(myPlay, {
      controls: true, // 控制器
      fill: true, // 填充模式
      playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2.0],
      plugins: {
        hotkeys: {
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false,
        },
      },
    });
    // 创建完player对象后
    init = true;
    player.on("play", onPlayerPlay); // 播放器开始
    player.on("pause", onPlayerPause); // 播放器暂停
    player.on("loadedmetadata", onPlayerReady); // 播放器加载完成
    player.on("ended", nextEpisod); // 播放器结束
    player.on("seeked", onPlayerSeeked); //手动选择进度
    // 视频尺寸改变 重新计算滚动距离
    player.on("fullscreenchange", () => {
      oDanmu.style.width = `${oVideoPlayer.offsetWidth}px`;
      oDanmu.style.height = `${oVideoPlayer.offsetHeight}px`;
      danmakuRef.resize();
    });
    player.on("ratechange", () => {
      if (speed) {
        process.client && localStorage.setItem("playBackRate", player.playbackRate().toString());
        playBackRate = player.playbackRate();
      }
    });
  }
  speed = false;

  player.src({
    src: playSrc,
    type: "application/x-mpegURL", // 流设置: m3u8
  });
};

const onPlayerSeeked = async function () {
  if (danmuTimer) clearInterval(danmuTimer);
  danmuList = [];
  danmakuRef.stop();
  danmakuRef.reset();
  await getDanmuData();
  danmakuRef.play();

  danmuTimer = setInterval(async () => {
    await getDanmuData(true);
  }, 10 * 1000);
};

// 播放器暂停时 弹幕暂停 清空不断请求的弹幕循环定时器
const onPlayerPause = function () {
  if (danmuTimer) clearInterval(danmuTimer);
  danmakuRef?.pause();
};

// 播放器播放时 渲染弹幕
const onPlayerPlay = function () {
  if (danmuTimer) clearInterval(danmuTimer);
  // 播放器播放时 设置一个定时器 每10秒钟获取一次弹幕

  danmuTimer = setInterval(async () => {
    await getDanmuData(true);
  }, 10 * 1000);
  danmakuRef?.Player();
};

// 播放器加载完成后 初始化dom？
const onPlayerReady = async function () {
  oVideo = document.querySelector(".vjs-tech") as HTMLVideoElement;
  oVideoPlayer = document.querySelector("#video_wrapper div video") as HTMLVideoElement;

  // 初始化弹幕
  await getDanmuData();
  oDanmu = document.querySelector("#_danmu") as HTMLDivElement;

  nextTick(() => {
    oDanmu.style.width = `${oVideo.offsetWidth}px`;
    oDanmu.style.height = `${oVideo.offsetHeight}px`;
    oDanmu.style.top = "0";
    oDanmu.style.left = "0";
    oDanmu.style.zIndex = "1000";
    oDanmu.style.position = "absolute";
    oDanmu.style.pointerEvents = "none";
    // 视频自动播放
    player.play();
    // 设置播放速度
    player.playbackRate(playBackRate);
    // 进度改变获取不同的弹幕
    danmuTimer = setInterval(async () => {
      await getDanmuData(true);
    }, 10 * 1000);
    speed = true;
  });
};

// 视频播放结束自动切换本章下一集
function nextEpisod() {
  (chapterList as IChapter[]).forEach((item) => {
    item.episodeList.forEach((subItem, subIndex) => {
      if (episodeId !== subItem.id) return;
      if (subIndex + 1 < item.episodeList.length) {
        emit("getVideoData", item.episodeList[subIndex + 1].id);
      } else {
        // 跨章时暂停
      }
    });
  });
}

onBeforeUnmount(() => {
  if (player) player.dispose();
  if (danmuTimer) clearInterval(danmuTimer);
});

defineExpose({ newPlayer });

// const danmuList = [
//   {
//     head_img: "https://file.xdclass.net/user_file/2022/09/60027b661a6738f62d5b44834484477d.jpeg",
//     content: "啊实打实多多",
//     style: "COMMON_1",
//   },
//   {
//     head_img: "https://file.xdclass.net/user_file/2022/09/60027b661a6738f62d5b44834484477d.jpeg",
//     content: "啊实打实多多",
//     style: "COMMON_2",
//   },
//   {
//     head_img: "https://file.xdclass.net/user_file/2022/09/60027b661a6738f62d5b44834484477d.jpeg",
//     content: "啊实打实多多",
//     style: "COMMON_3",
//   },
//   {
//     head_img: "https://file.xdclass.net/user_file/2022/09/60027b661a6738f62d5b44834484477d.jpeg",
//     content: "啊实打实多多",
//     style: "COMMON_4",
//   },
//   {
//     head_img: "https://file.xdclass.net/user_file/2022/09/60027b661a6738f62d5b44834484477d.jpeg",
//     content: "啊实打实多多",
//     style: "COMMON_5",
//   },
// ];
</script>

<template>
  <!-- init初始化时 将弹幕瞬移到video-js中 相对位置移动过去 -->
  <Teleport v-if="init" to=".video-js">
    <div id="_danmu">
      <vueDanmaku style="width: 100%; height: 100%" ref="danmakuRef" v-model:danmus="danmuList" :channels="5" :autoplay="false" :speeds="160" useSlot>
        <template v-slot:dm="{ danmu }">
          <div flex items-center>
            <img :src="danmu.head_img" wh-25 rounded-full />
            <span class="TEXT" :class="danmu.style">{{ danmu.content }}</span>
          </div>
        </template>
      </vueDanmaku>
    </div>
  </Teleport>
  <video ref="myPlay" controls style="height: 100%; width: 100%" class="video-js vjs-default-skin vjs-big-play-centered" />
</template>

<style scoped>
.TEXT {
  font-size: 20px;
}

.PLANT {
  color: white;
  -webkit-text-stroke: 2px black;
}

.COMMON_1 {
  color: #7dfd4b;
}

.COMMON_2 {
  color: #5094ea;
}

.COMMON_3 {
  color: #fdb34b;
}

.COMMON_4 {
  color: #ea50cb;
}

.COMMON_5 {
  color: #ee1a30;
}
</style>
