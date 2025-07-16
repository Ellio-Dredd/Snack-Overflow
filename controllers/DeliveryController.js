const Deliver = require("../models/Deliver");

// Save a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const { orderId, deliveryPerson, deliveryAddress, estimatedDeliveryTime, items, total, name } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    const newDelivery = new Deliver({
      orderId, // This should be the user ID or order ID
      deliveryPerson,
      deliveryAddress,
      estimatedDeliveryTime,
      items,
      total,
      name,
    });

    await newDelivery.save();

    // Respond with the created delivery
    res.status(201).json(newDelivery);
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

exports.getDeliveriesByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const deliveries = await Deliver.find({ orderId: userId }).sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    console.error("Error fetching user's deliveries:", err);
    res.status(500).json({ message: "Server error" });
  }
};


