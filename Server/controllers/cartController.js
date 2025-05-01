const CartItem = require("../models/CartItem");

const Deliver = require("../models/Deliver");  // Assuming you have created the Deliver model for orders


// Get all cart items
exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, name, price,image, quantity } = req.body;
    try {
        let item = await CartItem.findOne({ productId });
        if (item) {
            item.quantity += quantity;
        } else {
            item = new CartItem({
                productId,
                name,
                price,
                image,
                quantity
            });
        }
        await item.save();
        res.status(201).json(item);
    } catch (error) {
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


// Create a new delivery order
exports.createDelivery = async (req, res) => {
    const { userId, items, total } = req.body;
    try {
        const newDelivery = new Deliver({
            userId,
            items,
            total,
        });

        await newDelivery.save();
        res.status(201).json({ message: "Delivery order saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving delivery", error });
    }
};


