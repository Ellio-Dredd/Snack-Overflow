const Deliver = require("../models/Deliver");

// Save a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const {
      orderId,
      deliveryPerson,
      deliveryAddress,
      estimatedDeliveryTime,
      items,
      total
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const newDelivery = new Deliver({
      orderId,
      deliveryPerson,
      deliveryAddress,
      estimatedDeliveryTime,
      items,
      total
    });

    await newDelivery.save();
    res.status(201).json(newDelivery);

  } catch (err) {
    console.error("Error creating delivery:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get delivery by orderId
exports.getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Deliver.findOne({ orderId: id });

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json(delivery);

  } catch (err) {
    console.error("Error fetching delivery:", err);
    res.status(500).json({ message: "Server error" });
  }
};
