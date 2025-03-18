import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles.css"; // Import CSS

const EnterDetails = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", { ...formData, selectedDate, selectedTime });
    alert("Appointment Confirmed!");
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <h1>E-Channeling</h1>
      </div>

      {/* Appointment Details Section */}
      <div className="container">
        <h2>Enter Your Details</h2>

        {/* Show Selected Appointment Details */}
        <p><strong>Appointment Date:</strong> {selectedDate || "No date selected"}</p>
        <p><strong>Appointment Time:</strong> {selectedTime || "No time selected"}</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />

          <label>Doctor:</label>
          <select name="doctor" value={formData.doctor} onChange={handleInputChange} required>
            <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Brown">Dr. Brown</option>
          </select>

          <button type="submit" className="button">Confirm Booking</button>
        </form>
      </div>
    </>
  );
};

export default EnterDetails;
