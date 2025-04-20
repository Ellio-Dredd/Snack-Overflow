const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true, collection: 'cartitems' });  

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
