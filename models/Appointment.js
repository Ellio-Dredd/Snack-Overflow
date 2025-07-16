const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
