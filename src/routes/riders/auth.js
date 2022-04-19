const express = require("express");

const router = express.Router();
const RiderController = require("../../controllers/riders");

router.post("/login", RiderController.login);

router.post("/register", RiderController.createAccount);

module.exports = router;
