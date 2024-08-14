const NotifyService = require("../service/NotifyService.js");

const NotifyController = {
  captcha: async (req, res) => {
    let handleRes = await NotifyService.captcha();
    res.set("content-type", "image/svg+xml");
    res.send(handleRes);
  },
};

module.exports = NotifyController;
