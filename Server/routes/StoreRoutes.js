const express = require("express");
const { AddItem, getAllItems } = require("../controllers/StoreController");
const authenticateJWT = require('../middleware/authenticateJWT'); // Correct CommonJS import

const router = express.Router();

// POST route to add an item (no authentication required)
router.post("/Store", AddItem);

// GET route to fetch items (authentication required)
router.get("/Store", authenticateJWT, getAllItems);  // Add the JWT middleware here

module.exports = router;
