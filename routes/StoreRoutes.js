const express = require("express");
const { AddItem, getAllItems ,deleteItem, updateItem } = require("../controllers/StoreController");
const authenticateJWT = require('../middleware/authenticateJWT'); 

const router = express.Router();

// POST route to add an item (no authentication required)
router.post("/Store", AddItem);

// GET route to fetch items (authentication required)
router.get("/Store", authenticateJWT, getAllItems);  


router.delete("/:id", authenticateJWT, deleteItem);
router.put("/:id", authenticateJWT, updateItem);

module.exports = router;
