const Appointment = require("../models/Appointment");
const PDFDocument = require("pdfkit");

//appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { name, email, phone, doctor, date } = req.body;

    //midnight
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    //counting the booked appointments
    const count = await Appointment.countDocuments({
      doctor,
      date: {
        $gte: appointmentDate,
        $lt: new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000)
      },
    });

    const bookingNumber = count + 1;

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      doctor,
      date: appointmentDate,
      bookingNumber,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

//get all
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

//id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

//edit
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

//delete
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

//ebill pdf
exports.generateEBill = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ebill_${appointment._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("E-Bill - Appointment Confirmation", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Booking Number: ${appointment.bookingNumber}`);
    doc.text(`Name: ${appointment.name}`);
    doc.text(`Email: ${appointment.email}`);
    doc.text(`Phone: ${appointment.phone}`);
    doc.text(`Doctor: ${appointment.doctor}`);
    doc.text(`Date: ${new Date(appointment.date).toDateString()}`);
    doc.text(`Status: ${appointment.status || "pending"}`);

    doc.moveDown();
    doc.text("Thank you for using our service!", { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating e-bill", error });
  }
};
