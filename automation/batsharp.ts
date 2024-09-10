/**
 * 图片处理库
 * 将图片处理成体积更小的webp格式
 */
import * as fs from "node:fs";
import { batSharp } from "bat-sharp";

/**
 * public下的全部文件夹枚举
 */
const images: Array<string> = ["", "svg/"];

/**
 * 对图片进行压缩
 * @param input 图片路径
 */
async function batSharpImages(input?: string) {
  await batSharp({
    inputArr: [`public/images/${input}*.{png,svg,jpg,jpeg}`], // 具体的图片地址
    format: "webp", // 最终压缩成的格式
    outputPath: `.images/${input}`, // oss上传前的临时存储位置
    outputConfig: {
      quality: 60, // 压缩质量 60%
    },
  });
}

/**
 * 初始化图片压缩
 */
async function init() {
  // 判断目录存不存在 不存在就创建一个
  if (!fs.existsSync(".images")) {
    fs.mkdirSync(".images");
  } else {
    // 存在目录则删除原有目录（包括子目录） 然后再创建一个 避免图片资源陈旧问题
    fs.rmdirSync(".images", { recursive: true });
    fs.mkdirSync(".images");
  }

  // 对全部图片进行压缩处理
  await Promise.all(images.map(async (image) => await batSharpImages(image)));
}

// 执行
init();
