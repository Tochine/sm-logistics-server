const express = require("express");
const KycController = require("../controllers/kyc");
const { uploadImage } = require("../providers/upload");

const router = express.Router();

const { deSerialize } = require("../middlewares/auth");

router.use(deSerialize);

router.post("/kyc/license", uploadImage().single("license"), KycController.requestDriverLicense);
router.post("/kyc/passport", uploadImage().single("passport"), KycController.requestPassport);
router.post("/kyc/national-id", uploadImage().single("nationalId"), KycController.requestNationalId);
router.post("/credentials", KycController.requestExtra);


module.exports = router;