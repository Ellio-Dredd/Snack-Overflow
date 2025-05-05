const mongoose = require("mongoose");

const deliverSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: Number,
            name: String,
            price: Number,
            quantity: Number,
            
        },
    ],
    total: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Deliver", deliverSchema);
