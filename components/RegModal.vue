<template>
  <div class="reg-modal" v-if="registerModel.base">
    <div class="bg">
      <div class="content wfull flex">
        <!-- 背景图 -->
        <div class="bg-img flexc flex-col" :style="{ background: `url('images/svg/log_reg_bg.svg') no-repeat` }">
          <div absolute z-100 flexc flex-col>
            <span text-white text-16px font-600 tracking-10px ml-8px text-center>Elite Study</span>
            <div b="b white" m="t-6px b-10px" w-200px></div>
            <span text-white text-16px font-600 tracking-10px ml-8px text-center>精英学习 成就未来</span>
          </div>
        </div>

        <!-- 标题 / 关闭按钮 -->
        <div pt-36px px-50px flex="~ col" w-400px relative>
          <div justify-between flex wfull>
            <span text-20px font-600 color="#404040">快速注册</span>
            <img src="/images/svg/close_icon.svg" class="cursor-pointer select-none w-20px! h-20px!" @click="closeRegModel" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { registerModel } = $(useModel());

const emit = defineEmits(["cancel"]);

const closeRegModel = () => {
  registerModel.base = false;
  emit("cancel");
};
</script>

<style lang="less" scoped>
.reg-modal {
  overflow: hidden;
}

.bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: 0;
  z-index: 1200;
  width: 640px;
  height: 500px;
  margin: auto;
  border-radius: 10px;
  background-color: white;
}

.bg-img {
  width: 100%;
  height: 100%;
  position: relative;
  color: white;

  &::after {
    content: "";
    position: absolute;
    width: 240px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.66);
  }
}
</style>
