<script setup>
import BasicInfor from "./PersonalSettings/BasicInfor.vue";
const activeKey = $ref("1");
</script>

<template>
  <div class="PersonalSettings">
    <a-tabs v-model:activeKey="activeKey" p-8px>
      <a-tab-pane key="1" tab="基本信息">
        <BasicInfor />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #f38e48;
  text-shadow: none;
}

:deep(.ant-tabs-tab) {
  font-size: 16px;
}

:deep(.ant-tabs-tab:hover):hover {
  color: #f38e48;
}

:deep(.ant-tabs-ink-bar) {
  background-color: #f38e48;
}

:deep(.ant-tabs-content-holder) {
  height: 473px;
}
</style>
