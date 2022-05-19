const express = require("express");

const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AdminController = require("../../controllers/admins");
const config = require("../../config");

aws.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretKey,
  // region: config.aws.region
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    bucket: config.aws.bucketName,
    s3,
    // acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.get("/list", async (req, res) => {
  const result = await s3.listObjectsV2({ bucket: config.aws.bucketName }).promise();
  const x = result.Contents.map((item) => item.Key);
  res.send(x);
});

const { adminAuth } = require("../../middlewares/admin");

router.post("/login", AdminController.login);
router.post("/register", adminAuth, AdminController.register);
router.get("/items/awaiting-decision", adminAuth, AdminController.getItemsAwaitingApproval);

// router.get("/dashboard", deSerialize, AdminController.getDashboard);
// router.get("/items", deSerialize, AdminController.getItems);
// router.get("/item", deSerialize, AdminController.getsingleItem);
// router.get("/payment/type", deSerialize, AdminController.getPaymentTypes);
// router.get("/clients", deSerialize, AdminController.getClients);
// router.get("/client", deSerialize, AdminController.getSingleClient);
// router.post("/profile-image/upload", deSerialize, upload.single("image"), AdminController.storeProfileImage);

// router.get("/riders", deSerialize, AdminController.getRiders);
// router.get("/rider", deSerialize, AdminController.getSingleRider);
// router.post("/payment/confirm", deSerialize, AdminController.confirmPayment);

module.exports = router;
