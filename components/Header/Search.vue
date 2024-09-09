<script lang="ts" setup>
import { message } from "ant-design-vue";
import { getSearchList } from "~/api/search";
import type { ISearchList } from "~/types/api";

let searchInputValue = $ref(""); // 输入框内容
let timer = $ref<NodeJS.Timeout>(); // 定时器
let searchList = $ref<ISearchList[]>(); // 下拉框列表

// 当输入框输入内容一会后请求接口，显示下拉框
const onSearchInput = function () {
  // 每次输入时都清除前一个timer
  clearTimeout(timer);
  if (searchInputValue !== "") {
    // 防抖 五秒钟之后执行
    timer = setTimeout(async () => {
      searchList = (await getSearchList({ title: searchInputValue })).data;
    }, 500);
  }
};

// 下拉框列表数据
let getOptions = $computed(() => {
  return searchList?.map((item) => ({ id: item.id, value: item.title })).slice(0, 5);
});

// 搜索后清空输入框内容
const clearInputAndOptions = function () {
  searchInputValue = "";
  searchList = [];
  getOptions = [];
};

// 搜索执行
const onEnterKeydown = async function () {
  if (searchInputValue) {
    clearTimeout(timer);
    // 搜索结果页跳转
    await navigateTo({
      path: "/videoListPage",
      query: {
        search: searchInputValue,
      },
    });
    clearInputAndOptions();
  } else {
    message.info("请输入搜索内容");
  }
};
</script>

<template>
  <div class="search">
    <div absolute flexc z-100 top-5px right-7px @click="onEnterKeydown()">
      <img src="/images/svg/search.svg" />
    </div>
    <a-auto-complete
      v-model:value="searchInputValue"
      @change="onSearchInput()"
      placeholder="请输入搜索内容"
      :options="getOptions"
      @keydown.enter="onEnterKeydown"
      class="w-220px! rounded-119px"
      @select="onEnterKeydown()"
      :defaultActiveFirstOption="false"
    />
  </div>
</template>

<style lang="less" scoped>
.search {
  position: relative;
  width: 220px;

  :deep(.ant-select-selector) {
    border-radius: 119px;
  }

  :deep(.ant-select-selection-search) {
    width: 167px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
