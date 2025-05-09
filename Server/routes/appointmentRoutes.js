const express = require("express");
const {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/appointments/:id/ebill", appointmentController.generateEBill);


module.exports = router;
