const express = require("express");
const {
    getCartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart); 
router.put("/increase/:id", increaseQuantity);
router.put("/decrease/:id", decreaseQuantity);
router.delete("/:id", removeItem);
router.delete("/", clearCart);

module.exports = router;
