const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));

router.use("/account", require("./account"));

router.use("/items", require("./items"));

router.use("/kyc", require("./kyc"));

router.use("/info", require("./info"));

// router.use("/payments", require("./payment"));

// router.use('/items', require('./items'));

module.exports = router;
