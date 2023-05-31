const express = require("express");
const ctrl = require("../../controllers/auth");
const router = express.Router();
const { controlWrapper } = require("../../middlewares");
const { auth, upload } = require("../../middlewares");

router.post("/signup", controlWrapper(ctrl.registration));
router.get(
  "/verify/:verificationToken",
  controlWrapper(ctrl.verificationToken)
);
router.post("/verify", controlWrapper(ctrl.getEmailVerificationToken));
router.post("/login", controlWrapper(ctrl.login));
router.get("/current", auth, controlWrapper(ctrl.getCurrentUser));
router.get("/logout", auth, controlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controlWrapper(ctrl.updateAvatar)
);

module.exports = router;
