const Deliver = require("../models/Deliver");

// Save a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const { orderId, deliveryPerson, deliveryAddress, estimatedDeliveryTime, items, total,name } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    // Ensure delivery address is passed
    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    const newDelivery = new Deliver({
      orderId,
      deliveryPerson,
      deliveryAddress,
      estimatedDeliveryTime,
      items,
      total,
      name,
    });

    await newDelivery.save();
    res.status(201).json(newDelivery);  // Successfully saved the delivery order
  } catch (err) {
    console.error("Error creating delivery:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get delivery by orderId
exports.getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;  // Get the orderId (tracking number) from the URL
    const delivery = await Deliver.findOne({ orderId: id });  // Find the delivery by orderId

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json(delivery);  // Return the found delivery info
  } catch (err) {
    console.error("Error fetching delivery:", err);
    res.status(500).json({ message: "Server error" });
  }
};