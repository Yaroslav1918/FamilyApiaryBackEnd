const express = require("express");
const {
  controlWrapper,
  productsSchemaValidation,
  auth,
} = require("../../middlewares");
const ctrl = require("../../controllers/products");
const router = express.Router();
router.get("/", auth, controlWrapper(ctrl.getAllContacts));
router.get("/:id", auth, controlWrapper(ctrl.getById));
router.post(
  "/",
  auth,
  controlWrapper(ctrl.addProducts)
);
router.put(
  "/:id",
  auth,
  productsSchemaValidation,
  controlWrapper(ctrl.updateContactById)
);
router.delete("/:id", auth, controlWrapper(ctrl.removeProduct));

module.exports = router;
