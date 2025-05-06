const AdminDeliveryxxx = require('../models/Deliver');

// Get all delivery records
exports.getAllAdminDeliver = async (req, res) => {
  try {
    const deliveries = await AdminDeliveryxxx.find().populate('orderId');
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status of a delivery
exports.updateAdminDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'in_transit', 'delivered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await AdminDelivery.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Delivery not found.' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
