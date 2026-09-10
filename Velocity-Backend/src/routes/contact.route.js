const express = require("express");
const { sendContactMessage } = require("../controller/contact.controller");

const router = express.Router();

router.post("/", sendContactMessage);

module.exports = router;