<script lang="ts" setup>
interface IProps {
  title: string
  percent: number
}
defineProps<IProps>()
</script>

<template>
  <div w-152px mb-2 class="recent-study">
    <p class="truncate w-152px text-12px color-#7f7f7f">{{ title }}</p>
    <a-progress :percent="percent" size="small" strokeColor="#f88930" color="#aaaaaa" />
  </div>
</template>

<style lang="less" scoped>
.recent-study {
  :deep(.ant-progress-text) {
    color: #aaaaaa;
  }
}
</style>