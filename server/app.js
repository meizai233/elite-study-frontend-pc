const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/test", (req, res) => {
  res.send("请求成功");
});

app.listen(8888, () => {
  console.log("服务启动在：http://127.0.0.1:8888");
});
