const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({

  orderId: { type: mongoose.Schema.Types.ObjectId,  required: true },

  deliveryPerson: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, default: "pending" },
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: { type: Number, required: true },
  name:{type:String,required: true}
}, { timestamps: true });


const Deliver = mongoose.model('Deliver', deliverySchema);
module.exports = Deliver;

