<script lang="ts" setup>
import { getPlayRrecord } from "~~/api/account";
import RecentStudy from "./RecentStudy.vue";

const { personalInfo } = $(useUser());

const res = (await getPlayRrecord({ page: 1, size: 4 })).data.current_data;
</script>

<template>
  <div class="logged-container">
    <div>
      <div class="top">
        <div class="user-info" pt-4 ml-14px>
          <a-avatar :size="50" :src="personalInfo.head_img" />
          <div ml-12px>
            <span color="#4f555d" font-400>{{ personalInfo.username }}</span>
          </div>
        </div>
        <div mt-8px mx-14px flexb class="text-12px text-#7f7f7f">
          <span>学习时长：{{ (personalInfo.learn_time / 3600).toFixed(2) }}小时</span>
        </div>

        <div flex justify-center pl-14px pr-14px mt-15px>
          <div flexc flex-col mb-10px cursor-pointer>
            <span text-14px color="#4f555d">最近学习</span>
            <span bg="#4f555d" w-24px h-2px></span>
          </div>
        </div>
      </div>

      <div mb-1 class="recent-study">
        <div mt-2 v-for="item in res" :key="item.id">
          <RecentStudy :title="item.product_title" :percent="Math.ceil((item.learn_ids.split(',')?.length / item.episode_num) * 100)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.logged-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
}

.top {
  width: 100%;
  box-shadow: 0px 0px 5px 0px rgba(215, 215, 215, 0.35);

  .user-info {
    display: flex;
    align-items: center;
    position: relative;

    span {
      font-size: 16px;
      font-weight: bold;
      width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
}

.study-data,
.recent-study {
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.ant-progress-outer) {
  margin-right: calc(-2em - 24px);
  padding-right: calc(2em + 24px);
}
</style>
