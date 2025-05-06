const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  deliveryPerson: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_transit', 'delivered'], default: 'pending' },
  deliveryAddress: { type: String, required: true },
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Deliver', deliverySchema);
