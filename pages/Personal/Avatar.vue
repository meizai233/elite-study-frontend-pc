<script lang="ts" setup>
import { message, UploadFile } from "ant-design-vue";
import type { IApiBase } from "~/types/api";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";

const { token, personalInfo, asyncUserInfo } = $(useUser());
type UploadType = UploadFile<IApiBase<null>>;

const fileList = ref([]); // 初始文件值
let loading = $ref(false); // 加载变量控制

// 上传头像
const handleChange = async (info: UploadChangeParam<UploadType>) => {
  if (info.file.status === "uploading") {
    loading = true;
    return;
  }

  if (info.file.status === "done") {
    loading = false;

    if (info.file.response.code === 0) {
      await asyncUserInfo();
      message.success("上传成功！");
    }
    return;
  }

  if (info.file.status === "error") {
    loading = false;
    message.error("上传失败，请稍后重试！");
  }
};

// 上传前的格式校验
const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("只能上传JPG或者PNG格式图片!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("图片必须小于2mb");
  }

  return isJpgOrPng && isLt2M;
};

const cursor = $computed(() => {
  return !loading ? "default" : "not-allowed";
});
</script>

<template>
  <div w-100px h-100px rounded-full overflow-hidden relative class="avatar">
    <div v-if="loading" absolute z-20 class="top-90% left-10%" :style="{ cursor }">
      <loading-outlined text-80px text-white />
    </div>
    <a-upload
      v-model:file-list="fileList"
      name="headImg"
      list-type="picture"
      :max-count="1"
      :show-upload-list="false"
      :action="'http://127.0.0.1:8888/api/user/v1/update_img'"
      :before-upload="beforeUpload"
      @change="handleChange"
      :headers="{ authorization: `${token}` }"
      v-show="!loading"
    >
      <div opacity-60 w-100px bg-black z-20 bottom-0 text-white text-btn center-text-30>修改头像</div>
    </a-upload>
    <img :src="personalInfo.head_img" w-100px h-100px :style="{ opacity: loading ? '0.6' : '1' }" />
  </div>
</template>

<style lang="less" scoped>
.avatar {
  cursor: v-bind(cursor);

  span {
    bottom: 0;
    position: absolute;
  }
}
</style>
