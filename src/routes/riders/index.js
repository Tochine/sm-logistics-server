const express = require("express");

const router = express.Router();

router.use("/account", require("./account"));
router.use("/auth", require("./auth"));

module.exports = router;
