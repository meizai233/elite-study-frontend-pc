import { defineStore } from "pinia";

// 暴露一个方法 可以直接在任意文件引用
export const useUser = defineStore(
  "user",
  () => {
    let count = ref(1);
    const add = () => {
      count.value++;
    };
    const multiplyCount = computed(() => count.value * 2);
    return {
      count,
      add,
      multiplyCount,
    };
  },
  //持久化储存
  { persist: true }
);
