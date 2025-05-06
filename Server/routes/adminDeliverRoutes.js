const express = require('express');
const router = express.Router();
const adminDeliveryController = require('../controllers/adminDeliveryController');

// Route to get deliveries
router.get('/admin-delivery', adminDeliveryController.getAllAdminDelivery);

// Route to update status
router.patch('/admin-delivery/:id/status', adminDeliveryController.updateAdminDeliveryStatus);

module.exports = router;
