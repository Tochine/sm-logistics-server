const express = require("express");

const router = express.Router();
require("dotenv/config");
const AuthController = require("../controllers/auth");
// const Controller = require("../controllers");
const { getIpAndUserAgent } = require("../middlewares");

router.get("/healthcheck", async (req, res) => {
  const { host } = req.headers;
  // console.log(host);
  const { originalUrl } = req;
  console.log(host + originalUrl);
  console.log("*****************************");
  res.send({
    status: "success",
    message: "Healthcheck is wworking",
  });
});

router.post("/login", getIpAndUserAgent, AuthController.login);
router.post("/register", AuthController.register);
router.post("/otp/verify", AuthController.updateOtp);

// password recovery
router.post("/password/forgot", AuthController.forgotPassword);
router.post("/password/reset/:token", AuthController.resetPassword);

// router.post("/", AuthController.logout);

// router.get("/verify/:token", AuthController.verifyEmail);

module.exports = router;
