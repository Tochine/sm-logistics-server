const express = require("express");

const router = express.Router();
const ItemsController = require("../controllers/client");
// const {
//   createItem,
//   updateItem,
//   confirmItem
// }= require("../controllers/client");
const { deSerialize } = require("../middlewares/auth");

router.use(deSerialize());

router.post("/", ItemsController.createItem);

// router
//   .route("/")
//   .post(ItemsController.createDropOff);

router.put("/update", ItemsController.updateItem);
router.put("/comfirm", ItemsController.confirmItem);
// router.get("/item", ItemsController.getItem);
router.post("/confirm-reference/payment", ItemsController.paymentRefNumberConfirmation);

module.exports = router;
