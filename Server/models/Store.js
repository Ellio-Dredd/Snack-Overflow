const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  ItemID: { type: Number, required: true },
  ItemName: { type: String, required: true },
  ItemDes: { type: String, required: true }, 
  ItemPrice: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});




module.exports = mongoose.model("Store", StoreSchema);
