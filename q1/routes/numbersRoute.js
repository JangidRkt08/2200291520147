const express = require("express");
const router = express.Router();
const { getNumbersAndAverage } = require("../controllers/numberController");

// Route: /numbers/:numberid
router.get("/:numberid", getNumbersAndAverage);

module.exports = router;
