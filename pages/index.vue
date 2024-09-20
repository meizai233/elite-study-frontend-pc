<script setup lang="ts">
import Banner from "./index/Banner.vue";
import Classify from "./index/Classify.vue";
import UserInformation from "./index/UserInformation.vue";
import CardContainer from "./index/CardContainer.vue";
import { getCardList } from "~/api/card";
import AliYun from "./index/AliYun.vue";
import AboutInstructor from "./index/Instructor/AboutInstructor.vue";
import BroadSide from "./index/BroadSide.vue";
import { message } from "ant-design-vue";

// 视频卡片列表请求接口
const cardList = $ref((await getCardList()).data);
const route = useRoute();
let { loginModel } = $(useModel());
const { switchGithubLoginState } = $(useUser());

useHead({
  title: "优研平台 - 首页",
});

onMounted(() => {
  // 获取路由查询参数
  const oauthParam = route.query.oauth;
  // 如果 oauth 参数为 true，则进行操作
  if (oauthParam === "1") {
    // loginmodel设置为true 然后弹出toast 展示用户信息
    const username = route.query.username;
    switchGithubLoginState(username);
    message.success("登录成功");

    console.log("OAuth parameter is true. Performing the action.");
  }
});
</script>

<template>
  <div style="width: 1200px; min-width: 1200px">
    <div class="main">
      <!-- 分类 -->
      <div class="menu">
        <Classify />
      </div>
      <!-- 轮播图 -->
      <div class="swiper">
        <Banner />
      </div>
      <!-- 个人信息 -->
      <div class="user">
        <UserInformation />
      </div>
    </div>
    <!-- 热门课程 -->
    <div class="two-card-container">
      <CardContainer :title="cardList[0].name" :choice-card="0" :sub-titles="[cardList[0].summay]" :cards="cardList[0].product_list"> </CardContainer>
    </div>
    <!-- 新课上线 -->
    <div class="two-card-container">
      <CardContainer :title="cardList[1].name" :choice-card="0" :sub-titles="[cardList[1].summay]" :cards="cardList[1].product_list">
        <!-- 热销排行榜 -->
        <HotProduct />
      </CardContainer>
    </div>
    <!-- 讲师介绍 -->
    <div class="card-container" h-401px>
      <AboutInstructor />
    </div>
    <!-- 侧边栏 -->
    <client-only>
      <BroadSide />
    </client-only>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  height: 400px;
  margin-bottom: 20px;

  .swiper {
    flex: 5;
    border-radius: 10px;
  }
}

.card-container {
  margin-bottom: 20px;
}

.two-card-container {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
</style>
