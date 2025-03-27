const CartItem = require("../models/CartItem");

// Get all cart items
exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addToCart = async (req, res) => {
    const { productId, name, price, quantity } = req.body;
    try {
      // Try finding the item in the cart
      let item = await CartItem.findOne({ productId });
      
      // If item exists, update quantity, else create new cart item
      if (item) {
        item.quantity += quantity;
      } else {
        item = new CartItem({
          productId,
          name,
          price,
          quantity
        });
      }
  
      // Save the cart item
      await item.save();
  
      // Return the added/updated item
      res.status(201).json(item); 
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: "Failed to add item to cart." });
    }
  };
  

// Increase item quantity
exports.increaseQuantity = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await CartItem.findById(id);
        if (item) {
            item.quantity += 1;
            await item.save();
            res.json(item);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Decrease item quantity
exports.decreaseQuantity = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await CartItem.findById(id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            await item.save();
            res.json(item);
        } else {
            res.status(400).json({ message: "Minimum quantity is 1" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
    const { id } = req.params;
    try {
        await CartItem.findByIdAndDelete(id);
        res.json({ message: "Item removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        await CartItem.deleteMany({});
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
