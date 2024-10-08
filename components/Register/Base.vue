<script lang="ts" setup>
// message非组件 需要显示引入
import { message } from "ant-design-vue";
import { register } from "~/api/account";
import { sendCode } from "~/api/notify";

// $到底是什么 待办
const { changeToFinish } = $(useModel());

const { registerCurrent } = defineProps<{ registerCurrent: { phone: string; code: string; captcha: string; accept: boolean } }>();

// 图形验证码获取
let captchaSrc = $ref(`${baseUrl}/notify/v1/captcha?type=register&time=${Date.now()}`);
// 更新图形验证码
const resetCaptchaSrc = () => {
  if (captchaSrc.includes("&time")) {
    captchaSrc = captchaSrc.replace(/&time=[0-9]*/, "&time=" + Date.now());
  }
};

// 获取手机验证码
const getCode = async () => {
  // 手机号校验
  if (registerCurrent.phone) {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phoneReg.test(registerCurrent.phone)) {
      message.warn("手机号码不合规");
      return;
    }
  } else {
    message.warn("请输入手机号码");
    return;
  }

  // 图形验证码
  if (!registerCurrent.captcha) {
    message.warn("请输入图形验证码");
    return;
  }

  /**
   * 手机验证码接口逻辑
   */
  const data = await sendCode({ phone: registerCurrent.phone, captcha: registerCurrent.captcha, type: "register" });
  if (data.code === 0) {
    isDisable = true;
    countDownFun();
    message.success("发送手机验证码成功");
  } else {
    resetCaptchaSrc();
  }
};

// 验证码倒计时的逻辑
let countDown = $ref(60);
let timer = $ref(null);
let isDisable = $ref(false);
const countDownFun = () => {
  timer = setInterval(() => {
    countDown--;
    if (countDown <= 0) {
      clearInterval(timer);
      isDisable = false;
      countDown = 60;
    }
  }, 1000);
};

// 立即注册按钮
const onRegisterClick = async () => {
  if (!registerCurrent.code) {
    message.warn("请先发送手机验证码");
    return;
  }

  if (!registerCurrent.accept) {
    message.warn("请先同意协议");
    return;
  }

  /**
   * 请求接口逻辑
   */
  const data = await register({ phone: registerCurrent.phone, code: registerCurrent.code });
  if (data.code === 0) {
    // 注册完成
    clearInfo();
    changeToFinish();
  } else {
    resetCaptchaSrc();
  }

  clearInfo();
  changeToFinish();
};

const onFinish = () => {
  onRegisterClick();
};

const clearInfo = () => {
  (registerCurrent.code = ""), (registerCurrent.phone = ""), (registerCurrent.captcha = ""), (registerCurrent.accept = false);
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div mt-20px>
    <a-form autocomplete="off" ref="formRef" :model="registerCurrent" @finish="onFinish">
      <a-form-item name="reg">
        <a-input placeholder="请输入手机号" v-model:value="registerCurrent.phone" />
      </a-form-item>

      <!-- 图形验证码  -->
      <a-form-item name="regPCaptcha">
        <div flex>
          <a-input placeholder="请输入图形验证码" autoComplete="false" v-model:value="registerCurrent.captcha">
            <template #suffix>
              <reload-outlined mr-3px cursor-pointer @click="resetCaptchaSrc" />
            </template>
          </a-input>
          <div flex justify-center items-center>
            <img w-80px h-30px :src="captchaSrc" />
          </div>
        </div>
      </a-form-item>

      <!-- 手机验证码  -->
      <a-form-item name="regCaptcha">
        <a-input placeholder="请输入手机号或邮箱验证码" v-model:value="registerCurrent.code">
          <template #suffix>
            <div>
              <a-button type="link" size="small" p0 @click="getCode" :disabled="isDisable">
                {{ isDisable ? `${countDown}秒后重发` : "获取验证码" }}
              </a-button>
            </div>
          </template>
        </a-input>
      </a-form-item>

      <!-- 同意协议  -->
      <div flex items-center justify-between>
        <a-form-item name="-accept">
          <a-checkbox v-model:checked="registerCurrent.accept">
            <div flexc items-center text-13px>
              <div>同意优研平台</div>
              <a size="small" type="link" text-13px p0 m0 href="/agreementPage" color="#169bd5">《隐私策略》</a>
            </div>
          </a-checkbox>
        </a-form-item>
      </div>

      <a-form-item>
        <button type="submit" btn center-text-36 w-300px rounded-full bg="#4d555d" text-white cursor-pointer>立即注册</button>
      </a-form-item>
    </a-form>

    <!-- 微信注册登录方式 -->
    <div flex flex-col items-center justify-center>
      <span color="#555555">—更多登录方式—</span>
      <o-auth mb-8px />
    </div>
    <div absolute bottom-0 left-0 w-400px h-44px flexc style="background-color: rgba(77, 85, 93, 0.1)">
      <span select-none absolute z-100 color="#404040">已有账号？<span text-btn color="#5ebae2">登录</span></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-form-item) {
  margin-bottom: 20px;
}
</style>
