<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { IChapter } from "~/types/api";

const { productId, episodeId, chapterList } = defineProps<{
  productId: number;
  episodeId: number;
  chapterList: any;
}>();

const emit = defineEmits<{
  (e: "getVideoData", value: number): void;
}>();

/**
 * 实例化播放器
 */
let myPlay = $ref(null);
let player: videojs.Player | null = null;
let newPlayer = async (playSrc: string) => {
  if (process.server) return;
  if (!player) {
    player = videojs(myPlay, {
      controls: true, // 控制器
      fill: true, // 填充模式
      playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2.0],
    });
    player.on("loadedmetadata", () => player.play());
    player.on("ended", nextEpisod);
  }
  player.src({
    src: playSrc,
    type: "application/x-mpegURL", // 流设置: m3u8
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
});

defineExpose({ newPlayer });
</script>

<template>
  <video ref="myPlay" controls style="height: 100%; width: 100%" class="video-js vjs-default-skin vjs-big-play-centered" />
</template>

<style scoped>
.TEXT {
  font-size: 24px;
  font-weight: bold;
  color: transparent;
  background-clip: text;
}

.PLANT {
  color: white;
  -webkit-text-stroke: 2px black;
}

.COMMON_1 {
  background-image: linear-gradient(90deg, #fdb34b 0%, #fbe36c 98.57142857142858%);
}

.COMMON_2 {
  background-image: linear-gradient(90deg, #5094ea 0%, #5d41ba 45.34285714285714%, #c669a0 98.57142857142858%);
}

.COMMON_3 {
  background-image: linear-gradient(90deg, #fdb34b 0%, #fbe36c 98.57142857142858%);
}

.COMMON_4 {
  background-image: linear-gradient(90deg, #5094ea 0%, #5d41ba 45.34285714285714%, #c669a0 98.57142857142858%);
}

.COMMON_5 {
  background-image: linear-gradient(90deg, #fe4d5f 0%, #ffc666 98.57142857142858%);
}

.VIP_1 {
  background-image: linear-gradient(90deg, #785cc8 0%, #854edb 98.57142857142858%);
}

.VIP_2 {
  background-image: linear-gradient(90deg, #254abd 0%, #7dabef 98.57142857142858%);
}

.VIP_3 {
  background-image: linear-gradient(90deg, #cf45e7 0%, #d967e3 98.57142857142858%);
}

.VIP_4 {
  background-image: linear-gradient(90deg, #fdb34b 0%, #fbe36c 98.57142857142858%);
}

.VIP_5 {
  background-image: linear-gradient(90deg, #785cc8 0%, #854edb 98.57142857142858%);
}

.VIP_TRAIN_1 {
  background-image: linear-gradient(90deg, #fcb64f 0%, #ffb105 98.57142857142858%);
}

.VIP_TRAIN_2 {
  background-image: linear-gradient(0deg, #bb4444 0%, #f66d68 90.81349206349216%);
}

.TRAIN_1 {
  background-image: linear-gradient(-180deg, #ecc27d 9.186507936507835%, #b76420 100%);
}

.TRAIN_2 {
  background-image: linear-gradient(-180deg, #2e6ec4 9.186507936507835%, #4252c4 100%);
}
</style>
