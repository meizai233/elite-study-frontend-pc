<template>
  <div>
    <Header />
    <div class="main-container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<!-- 在layout中自动引入components中的组件 -->
<script setup></script>

<style lang="less" scoped>
.layouts {
  height: 100vh;
}

.main-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  min-height: 68vh;
}
</style>
