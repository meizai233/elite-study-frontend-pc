<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Pagination } from "swiper";
import { getBanner } from "~/api/banner";

// 为什么这个getBanner 没有在浏览器被看到 待办
// 如果不能看到 如何调试
const swiperData = reactive((await getBanner("home_swiper_banner")).data);
const imgSrcArr = computed(() => {
  return swiperData.img_url?.split(",");
});
</script>

<template>
  <swiper navigation pagination class="banner" :modules="[Navigation, Autoplay, Pagination]" :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }" loop>
    <swiper-slide v-for="(item, idx) in imgSrcArr" :key="item">
      <a :href="swiperData.pc_link" target="__blank">
        <img :src="item" />
      </a>
    </swiper-slide>
  </swiper>
</template>
<style lang="less" scoped>
.banner {
  width: 840px;
  height: 400px;
  --swiper-theme-color: #4e4d53;
  --swiper-navigation-size: 30px;

  :deep(.swiper-slide),
  :deep(.swiper-slide) img {
    display: block;
    width: 840px;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>
