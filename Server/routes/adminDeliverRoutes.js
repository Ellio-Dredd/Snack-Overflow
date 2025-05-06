const express = require('express');
const router = express.Router();
const adminDeliveryxxxController = require('../controllers/adminDeliverController');

// GET all deliveries
router.get('/', adminDeliveryxxxController.getAllAdminDeliveryxxx);

// PATCH update delivery status
router.patch('/:id/status', adminDeliveryxxxController.updateAdminDeliveryxxxStatus);

module.exports = router;
