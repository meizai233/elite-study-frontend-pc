/**
 * @param {*} captcha 图形验证码服务
 * @param {*} sendCode 手机验证码服务
 */

const svgCaptcha = require("svg-captcha");
const redisConfig = require("../config/redisConfig");
const { sendMsgCode } = require("../config/aliyunMessage");

const NotifyService = {
  captcha: async (key, type) => {
    let captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 1, // 干扰线
      background: "#aaa", // 背景颜色
    });
    // 缓存到redis里
    // redisConfig.set("captcha", captcha.text, 600);
    redisConfig.set(`${type}:captcha:` + key, captcha.text, 600);

    return captcha.data;
  },

  // 1检查手机验证码是否已经过期
  // 2检查是否触发图形验证码 且图形验证码是否填写一致
  // 3发送手机验证码，一个存在code，一个存在over（表示是否过期）
  // 4 发送完手机验证码之后 图形验证码就已经失效了 需要删除
  sendCode: async (mobile, captcha, type, key, randomCode) => {
    // 60秒内不能重复获取
    if (await redisConfig.exists(`${type}:over:` + mobile)) {
      return { code: -1, msg: "60秒内不能重复获取" };
    }

    // 是否有图形验证 在redis查找是否存在
    if (!(await redisConfig.exists(`${type}:captcha:` + key))) {
      return { code: -1, msg: "请发送图形验证码" };
    }

    // 对比用户的图形验证码和redis储存的是否一致
    let captchaRedis = await redisConfig.get(`${type}:captcha:` + key);
    if (!(captcha.toLowerCase() === captchaRedis.toLowerCase())) {
      return { code: -1, msg: "图形验证码错误" };
    }

    // 发送手机验证码
    let codeRes = (await sendMsgCode(mobile, randomCode)).data;
    // 存入redis
    redisConfig.set(`${type}:code:` + mobile, randomCode, 600);

    // 在over list里放1表示是否过期
    // 存60秒判断的key
    redisConfig.set(`${type}:over:` + mobile, "1", 60);

    // 删除图形验证码
    redisConfig.del(`${type}:captcha:` + key);

    if (codeRes.code == "200") {
      return { code: 0, msg: "发送成功" };
    } else {
      return { code: -1, msg: "发送失败" };
    }
  },
};

module.exports = NotifyService;
