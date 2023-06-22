const express = require("express");
const {
  controlWrapper,
  auth,
} = require("../../middlewares");
const ctrl = require("../../controllers/products");
const router = express.Router();
router.get("/", auth, controlWrapper(ctrl.getAllProducts));
router.get("/:id", auth, controlWrapper(ctrl.getById));
router.post(
  "/",
  auth,
  controlWrapper(ctrl.addProducts)
);
router.post("/sold-products", auth, controlWrapper(ctrl.getSoldProducts));

router.delete("/:id", auth, controlWrapper(ctrl.removeProduct));

module.exports = router;
