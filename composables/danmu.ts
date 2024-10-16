import { defineStore } from "pinia";

export const useDanmuState = defineStore(
  "danmu_state",
  () => {
    const global = ref<boolean>(true);

    return { global };
  },
  { persist: true }
);
