import { defineStore } from "pinia";

export const useDanmuState = defineStore(
  "danmu_state",
  () => {
    const global = ref<boolean>(false);

    return { global };
  },
  { persist: true }
);
