<script lang="ts" setup>
import { message } from "ant-design-vue";
import { getDuration } from "~/api/rank";

// 请求卷王排行榜数据
const data = (await getDuration()).data;

// 默认展示9个
let maxData = $ref(9);

// 当数据大于9条时可以滑动
const overflowY = computed(() => {
  return maxData <= 9 ? "hidden" : "scroll";
});

// 点击查看更多更新数据
const getData = computed(() => {
  if (!data) return;
  // 将排行榜数据进行深拷贝
  const cloneData = JSON.parse(JSON.stringify(data));
  // 客户端时机执行toast
  if (process.client && maxData > 9) {
    message.success("加载成功，往下滚动");
  }
  return cloneData.splice(0, maxData);
});

// 查看更多按钮
const onMoreClick = function () {
  if (maxData >= data.length) {
    message.warn("没有更多的数据了");
  } else {
    maxData += 9;
  }
};

// 格式化时长
const getMinuteHandle = function (_minute: number) {
  const hours = Math.floor(_minute / 60);
  const minute = _minute % 60;
  return `${hours}小时${minute.toFixed(2)}分`;
};

// 前三名的名次加颜色
const getRankColor = function (rank: number) {
  switch (rank) {
    case 1:
      return "#FF5353";
    case 2:
      return "#F6742E";
    case 3:
      return "#FFBC09";
    default:
      return "#333333";
  }
};
</script>

<template>
  <div style="box-shadow: 0px 0px 10px 0px #d5d5d5" rounded-10px h-653px>
    <a-card rounded-10px class="h-100%! w-284px" id="learn-rank-list">
      <template #title>
        <div flex flex-col>
          <div flexb :style="{ padding: '0 24px 10px 24px' }">
            <span>卷王排行榜</span>
            <a-tag color="#a6aaae" w-70px h-24px text-center leading-22px text-12px rounded-5px>近七天</a-tag>
          </div>
          <div text="#404040" flex items-center text-center text-14px p2 border-t b="#f0f0f0">
            <span ml-4>排行</span>
            <span ml-16>名称</span>
            <span ml-16>学习时长</span>
          </div>
        </div>
      </template>

      <div v-for="(item, index) in getData" mb-4 class="grid-item" ref="learnRankListData">
        <span text-24px text-center :style="{ color: getRankColor(index + 1) }">{{ index + 1 }}</span>
        <div flex items-center mr-2px relative>
          <img w-36px h-36px rounded-full b="~ red" select-none :src="item.head_img" />
          <p h-17px text-12px ml-9px truncate :title="item.username">{{ item.username }}</p>
        </div>
        <span text-12px>{{ getMinuteHandle(item.minute) }}</span>
      </div>
      <button @click="onMoreClick" bg="#f2f2f2" text="center #555555" hover="bg-gray-100 text-gray-8" rounded="br-10px bl-10px" class="btn text-14px p2 absolute bottom-0 cursor-pointer">
        查看更多
      </button>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-card-head) {
  padding: 0;
}

:deep(.ant-card-head-title) {
  padding: 16px 0 0 0;
}

:deep(.ant-card-head-wrapper) {
  padding: 0;
  height: 100px;
  width: 284px;
}

:deep(.ant-card-body) {
  padding: 0;
  height: 505px;
  scroll-behavior: smooth;
  overflow-y: v-bind(overflowY);
}

:deep(.ant-table-measure-row) {
  height: 0;
}

.btn {
  width: 284px;
  height: 46px;
}

.grid-item {
  display: grid;
  grid-template-columns: 70px 120px 1fr;
  align-items: center;
  margin-bottom: 0;

  &:first-child {
    margin-top: 10px;
  }

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.grid-item:end {
  margin-bottom: 24px;
}
</style>
