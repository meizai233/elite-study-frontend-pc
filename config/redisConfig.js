const Redis = require("ioredis");

const redis = new Redis({
  port: 6379,
  host: "47.121.207.171",
  password: "Qweasd123",
});

const redisConfig = {
  // redis存数据
  set: (key, value, time) => {
    time ? redis.set(key, value, "EX", time) : redis.set(key, value);
  },

  // redis获取数据
  get: (key) => {
    return redis.get(key);
  },
};

module.exports = redisConfig;
