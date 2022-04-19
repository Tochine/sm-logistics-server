const express = require("express");
const RidersAccountController = require("../../controllers/riders/account");
const RiderController = require("../../controllers/riders");
const { uploadImage } = require("../../providers/upload");

const router = express.Router();

const { riderIsAuthenticated } = require("../../middlewares/auth");

// router.use(deSerialize);

router.get("/", riderIsAuthenticated, RidersAccountController.getRiderAccount);
router.get("/history", riderIsAuthenticated, RidersAccountController.getRiderHistory);

// router.post("/auth/login", RidersAccountController.login);

// router.post("/auth/register", RidersAccountController.register);

// router.get("/verify-email", RidersAutthController .verifyEmail);

// router.post("/change-password", RidersAutthController .changeAccountPassword);

router.post("/coordinates", riderIsAuthenticated, RidersAccountController.storeRiderCoordinates);
router.post("/kyc/passport", riderIsAuthenticated, uploadImage().single("passport"), RiderController.verifyPassport);
router.post("/kyc/driver-license", riderIsAuthenticated, uploadImage().single("license"), RiderController.verifyDriverLicense);
router.post("/kyc/national-identification", riderIsAuthenticated, uploadImage().single("nationalId"), RiderController.verifyNationalId);

module.exports = router;
