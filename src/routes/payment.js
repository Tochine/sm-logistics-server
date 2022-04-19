const express = require("express");
const PaymentController = require("../controllers/payment");
const { deSerialize } = require("../middlewares/auth");

const router = express.Router();

// router.use(deSerialize);

// router.put("/", PaymentController.createPayment);
router
  .route("/")
  .post(PaymentController.verifyPaymentCard)
  .get(PaymentController.getPaymentCards);
// router.post("/verify/card", PaymentController.verifyPaymentCard);
router.post("/create", PaymentController.initializePayment);
router.get("/card/callback", PaymentController.paymentCallback);

module.exports = router;
