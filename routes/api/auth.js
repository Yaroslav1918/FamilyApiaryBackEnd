const express = require("express");
const ctrl = require("../../controllers/auth");
const router = express.Router();
const { controlWrapper } = require("../../middlewares");
const { auth } = require("../../middlewares");

router.post("/signup", controlWrapper(ctrl.registration));
router.post("/login", controlWrapper(ctrl.login));
router.post("/google-login", controlWrapper(ctrl.googleLogin));
router.get("/current", auth, controlWrapper(ctrl.getCurrentUser));
router.get("/logout", auth, controlWrapper(ctrl.logout));


module.exports = router;
