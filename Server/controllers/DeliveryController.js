const Deliver = require("../models/Deliver");

exports.createDelivery = async (req, res) => {
  try {
    const { orderId, deliveryPerson, deliveryAddress, estimatedDeliveryTime } = req.body;

    const delivery = new Deliver({
      orderId,
      deliveryPerson,
      deliveryAddress,
      estimatedDeliveryTime,
    });

    await delivery.save();
    res.status(201).json(delivery);

  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({ message: "Failed to create delivery" });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Deliver.findOne({ orderId: id }); // assuming id is userId

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({
      orderId: delivery.orderId,
      status: delivery.status,
      estimatedTime: delivery.estimatedDeliveryTime,
      actualTime: delivery.actualDeliveryTime,
    });
  } catch (error) {
    console.error("Error fetching delivery:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createDelivery,
  getDeliveryById,
  // add other functions here
};


