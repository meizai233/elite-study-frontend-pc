<script lang="ts" setup>
import { getPlayRrecord } from "~~/api/account";
import { IPage, IPlayRecord } from "~/types/api";
import Avatar from "./Personal/Avatar.vue";
import PersonalSettings from "./Personal/PersonalSettings.vue";

const { personalInfo } = $(useUser());

useHead({
  title: "优研平台 - 个人中心",
});

/**
 * 最近播放记录
 */
let data = ref<IPage<IPlayRecord>>();
const getPlayRrecordData = async (page = 1) => {
  const res = await getPlayRrecord({ page: page, size: 5 });
  data.value = res.data;
};
await getPlayRrecordData();

// 计算播放进度的百分比
const getProgress = function (item: IPlayRecord) {
  return Math.ceil((item.learn_ids.split(",")?.length / item.episode_num) * 100);
};
</script>

<template>
  <div class="personal">
    <!-- 个人信息栏 -->
    <div class="personal-header">
      <div class="header" mb-20px>
        <Avatar />
        <div class="name" color="#222222" text-16px font-700 truncate w-100px text-center>
          {{ personalInfo.username }}
        </div>
        <div color="#404040" text-14px>ID：{{ personalInfo.id }}</div>
      </div>

      <div class="mess" pl-45px>
        <div>累计学习时长：{{ (personalInfo.learn_time / 3600).toFixed(2) }} 小时</div>
        <div>个人签名：{{ !personalInfo.slogan ? "这个人太懒了还没写签名" : personalInfo.slogan }}</div>
      </div>

      <div class="lately">
        <div class="video-item" v-for="item in data.current_data?.slice(0, 2)">
          <img :src="item.cover_img" />
          <div p2>
            <div class="title truncate-2 cursor-pointer">
              {{ item.product_title }}
            </div>
            <div class="schedule">
              <a-progress size="small" strokeColor="#f38e48" :show-info="false" :percent="getProgress(item) >= 100 ? 100 : getProgress(item)" />
            </div>
            <div class="schedule-text" text-12px text="#f38e48">
              <span>已学习{{ item.learn_ids?.split(",")?.length }} / {{ item.episode_num }}章节</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div flex mt-15px>
      <div w-full style="box-shadow: 0px 0px 10px 0px #d7d7d7" rounded-10px p3>
        <PersonalSettings />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.personal {
  width: 1200px;

  .personal-header {
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #d5d5d5;
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-around;

    .lately {
      width: 500px;
      display: flex;

      .video-item {
        width: 188px;
        height: 210px;
        margin-left: 40px;
        box-shadow: 0px 0px 10px 0px #d5d5d5;
        border-radius: 10px;

        img {
          width: 188px;
          height: 110px;
          padding: 0;
          border-radius: 10px 10px 0 0;
        }

        .title {
          color: #404040;
          font-size: 12px;
          height: 38px;

          &:hover {
            color: #f19858;
          }
        }

        .schedule-text {
          display: flex;
          justify-content: space-between;

          .learnButton {
            cursor: pointer;

            &:hover {
              color: #f19858;
            }
          }
        }

        .schedule {
          margin-bottom: 5px;
        }
      }
    }

    .header {
      align-items: center;
      display: flex;
      flex-direction: column;
    }

    .mess {
      & > div:not(:last-child) {
        margin-bottom: 20px;
      }

      div {
        span {
          display: inline-block;
          width: 180px;
          font-size: 14px;
        }

        .autograph {
          width: 300px;
        }
      }
    }
  }

  .classify {
    width: 190px;
    height: 400px;
    border-radius: 5px;
    flex-shrink: 0;
    box-shadow: 0px 0px 10px 0px #d7d7d7;

    ul {
      padding: 10px 0;
      width: 100%;
    }

    li {
      width: 100%;
      height: 54px;
      cursor: pointer;
      font-size: 16px;
      line-height: 54px;
      padding-left: 19px;

      &:hover {
        color: white;
        background-color: #434b52;
      }

      &.active {
        color: white;
        background-color: #434b52;
      }
    }

    li:hover > * {
      color: white;
    }
  }
}
</style>
