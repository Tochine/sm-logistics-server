const express = require("express");

const router = express.Router();
const ItemsController = require("../controllers/items");
// const {
//   createItem,
//   updateItem,
//   confirmItem
// }= require("../controllers/client");
const { deSerialize } = require("../middlewares/auth");

router.use(deSerialize);

router.post("/", ItemsController.createItem);

// router
//   .route("/")
//   .post(ItemsController.createDropOff);

router.put("/update", ItemsController.updateItem);
router.put("/confirm", ItemsController.confirmItem);
router.post("/payment-reference", ItemsController.paymentRefNumberConfirmation);
// router.get("/item", ItemsController.getItem);


module.exports = router;
