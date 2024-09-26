<script lang="ts" setup>
import Player from "./videoPlayPage/Player.vue";
import { getChapter } from "~/api/product";
import { getVideo } from "~/api/video";
import { IChapter } from "~/types/api";

// tab数据
const navList = [
  {
    title: "章节",
    img: "/images/zhangjie.png",
    imga: "/images/zhangjiea.png",
  },
];

/**
 * 视频状态管理
 */
let _episodeId = $ref(Number(useRoute().query.eid));

const realVideoId = $computed(() => {
  return Number(useRoute().query.id) || 1;
});

/**
 * 目录接口数据
 */
let chapterList = $ref<IChapter[]>([]);
const getChapterList = async () => {
  const res = await getChapter(realVideoId);
  chapterList = res.data;
  _episodeId = _episodeId || res.data[0].episodeList[0].id;
  await getVideoData(_episodeId);
};

/**
 * 集数选择
 */
const sectionClick = async (val: any) => {
  await getVideoData(val.id, true);
};

/**
 * 视频源
 */
const xdclassPlayer = $ref<{
  newPlayer: (playSrc: string) => void;
  sendDanmu: (playSrc: string) => void;
}>();
const getVideoData = async (id?: number, clickChose?: boolean) => {
  const res = await getVideo({ episodeId: id });
  if (res.code === 0) {
    _episodeId = id;
    clickChose && navigateTo(`videoPlayPage?id=${realVideoId}&eid=${id}`);
    xdclassPlayer?.newPlayer(res.data.playResult);
  }
};
onMounted(async () => {
  await getChapterList();
});

// 左侧tab项点击
let navSelect = $ref(null);
let expandShow = $ref(false);
const navClick = (val: number) => {
  if (navSelect === val) {
    navSelect = -1;
    expandShow = !expandShow;
    return;
  } else {
    // 章集默认展示集播放视频
    if (val === 0) {
      if (process.server) return;
      const oChapterSection = document.querySelector(".chapter-section") as HTMLDivElement;
      setTimeout(() => {
        for (let i = 0; i < oChapterSection.children.length; i++) {
          const chapter = oChapterSection.children[i];
          for (let i = 0; i < chapter.children[1].children.length; i++) {
            const episode = chapter.children[1].children[i];
            // 将播放的对应集展示在视口
            if (episode.classList.contains("selected")) {
              chapter.scrollIntoView({ behavior: "auto", block: "center" });
              document.body.scrollIntoView();
              break;
            }
          }
        }
      });
    }
    expandShow = true;
    navSelect = val;
  }
};

// 弹幕开关
let { global } = $(useDanmuState());
const switchDanmu = function () {
  global = !global;
};

// 发送弹幕
let danmuContent = $ref("");
function sendDanmu() {
  xdclassPlayer.sendDanmu(danmuContent);
  danmuContent = "";
}

useHead({ title: "优研平台 - 视频播放" });
</script>

<template>
  <div wfull flexc flex-col>
    <div wfull bg="#191917" absolute h-91vh :style="{ top: '90px' }" />

    <!-- 左侧tab -->
    <div class="video-play" h-90vh>
      <div class="left">
        <div class="left-item" v-for="(item, index) in navList" :class="{ active: navSelect === index }" @click="navClick(index)" :style="{ backgroundColor: navSelect === index ? '#20201e' : '' }">
          <img wh-28 :src="navSelect === index ? item.imga : item.img" />
          <div class="text">{{ item.title }}</div>
        </div>
      </div>
      <!-- 章集 -->
      <div v-show="expandShow">
        <div class="sidebar-left" v-show="navSelect === 0">
          <div class="chapter-section">
            <div class="item" v-for="(item, index) in chapterList">
              <div class="chapter-text" :title="item.title">第 {{ index + 1 }} 章&nbsp; {{ item.title }}</div>
              <div class="section">
                <div class="section-item" v-for="(subItem, subIndex) in item.episodeList" :class="{ selected: subItem.id === _episodeId }" @click="sectionClick(subItem)" :title="subItem.title">
                  第 {{ subIndex + 1 }} 集 &nbsp;{{ subItem.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 视频播放器  -->
      <div flex="~ col" class="video-player">
        <div class="player relative flex items-center" id="video_wrapper" style="width: 100%; height: 97%" @click="navSelect = null">
          <ClientOnly>
            <Player ref="xdclassPlayer" :episode-id="_episodeId" :product-id="realVideoId" :chapter-list="chapterList" @get-video-data="getVideoData" />
          </ClientOnly>
        </div>
        <div mt-18px class="danmu">
          <img class="cursor-pointer h-25px bg-none mr" @click="switchDanmu()" :src="`/images/video_${global ? 'open' : 'close'}.png`" />
          <a-input mr-25px rounded-5px @keypress.enter.native="sendDanmu()" v-model:value="danmuContent" placeholder="请输入你要发送的弹幕" />
          <a-button @click="sendDanmu()">发送</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-bg {
  background-color: #20201e;
  height: 82.5%;
  width: 360px;
  left: 140px;
  position: absolute;
  z-index: 1000;
}

:deep(.video-js .vjs-next-control .vjs-icon-placeholder:before) {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
  content: "\f120";
  transform: rotate(180deg);
  cursor: pointer;
}

.introduce {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 87%;
  justify-content: space-between;
  padding-bottom: 21px;
}

.video-player {
  flex: 1;
  margin-right: 80px;
}

:deep(.vjs-paused) {
  .vjs-big-play-button {
    display: block;
  }
}

.video-play {
  width: 100%;
  font-size: 12px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 20px 20px 0;

  .left {
    width: 140px;
    height: 87%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .left-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px;
      color: #aaaaaa;
      cursor: pointer;
    }

    .active {
      background-color: #3b4046;
      color: #fff;
    }

    .text {
      margin-top: 5px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .chapterIcon {
    height: 45px;
    position: absolute;
    z-index: 1000;
    top: 40%;
    cursor: pointer;
  }

  .tabs {
    color: white;

    li {
      cursor: pointer;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      background-color: #646e77;
      text-align: center;
      font-size: 20px;
      font-weight: 500;

      &:not(:nth-child(2)) {
        line-height: 80px;
      }

      &:nth-child(2) {
        padding: 18px;
        line-height: 22px;
      }
    }
  }

  .danmu {
    display: flex;
    align-items: center;
    justify-content: center;

    & > *:not(img) {
      color: white;
      background-color: #565e65;
    }

    & > button {
      width: 100px;
      border-radius: 5px;
    }
  }

  .play-main {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 600px;
  }

  .sidebar-left {
    cursor: pointer;
    background-color: #20201e;
    color: #fff;
    position: absolute;
    z-index: 10011;
    left: 140px;
    height: 89.1%;

    .chapter-section {
      padding: 10px;
      overflow-y: auto;
      height: 100%;

      .item {
        margin-bottom: 5px;

        .chapter-text {
          width: 350px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 30px;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .section {
          margin-left: 20px;
          width: 350px;
          color: #ddd;

          .section-item {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 25px;
            color: hsla(0, 0%, 100%, 0.6);
            margin-bottom: 5px;
          }

          .selected {
            color: #ec1500;
          }
        }
      }
    }
  }

  .play-header {
    display: flex;
  }
}
</style>
