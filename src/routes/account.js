const express = require("express");

const router = express.Router();
const Controller = require("../controllers/client");
const { deSerialize } = require("../middlewares/auth");
const { uploadImage } = require("../providers/upload");

router.post("/", deSerialize, Controller.logout);
router.get("/profile", deSerialize, Controller.getAccount);
router.post("/profile-image", deSerialize, uploadImage().single("image"), Controller.profileImage);
router.get("/items", deSerialize, Controller.getAccountItemHistory);
router.post("/update", deSerialize, Controller.updateAccount);

router.post("/update-password", deSerialize, Controller.updateAccountPassword);

module.exports = router;
