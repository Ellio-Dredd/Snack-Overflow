const express = require("express");
const { AddItem, getAllItems } = require("../controllers/StoreController");

const router = express.Router();

router.post("/Store", AddItem);
router.get("/Store", getAllItems);

module.exports = router;