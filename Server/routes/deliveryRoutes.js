const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/DeliveryController');

// Create a new delivery
router.post('/deliveries', deliveryController.createDelivery);

// Get a delivery by orderId
router.get('/deliveries/:id', deliveryController.getDeliveryById);

module.exports = router;
