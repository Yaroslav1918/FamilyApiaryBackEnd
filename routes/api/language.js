const express = require("express");
const ctrl = require("../../controllers/language");
const router = express.Router();
const { controlWrapper } = require("../../middlewares");

router.get("/:lng", controlWrapper(ctrl.language));

module.exports = router;