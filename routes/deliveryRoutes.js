const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/DeliveryController');

router.post('/', deliveryController.createDelivery);
router.get('/', deliveryController.getAllDeliveries);
router.get('/:id', deliveryController.getDeliveryById);
router.put('/:id', deliveryController.updateDelivery);
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;
