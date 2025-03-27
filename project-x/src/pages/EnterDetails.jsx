
import  { useState } from "react";


import { useLocation } from "react-router-dom";
import "../components/Styles.css"; // Import CSS

const EnterDetails = () => {
  const location = useLocation();
  const { selectedDate } = location.state || {}; // Removed selectedTime

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
  
    try {
      const response = await fetch("https://rajapaksepharmacy.azurewebsites.net/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: selectedDate }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Appointment Confirmed!");
        console.log("Appointment Details:", data);
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  

  return (
    <div className="container">
      <h2 className="title">Book Your Appointment</h2>

      <div className="appointment-container">
        {/* Left - Pharmacy Details */}
        <div className="pharmacy-section">
          <h3>Rajapakse Channeling Center</h3>
          <p>Schedule your appointment today, and our team will promptly reach out to confirm your booking!</p>

          <p className="pharmacy-address">
            <strong>Pharmacy Address:</strong><br />
            <span className="blue-text">Rajapakse Pharmacy,</span><br />
            No:456, Kurunegala Road,<br />
            Madampe 61230
          </p>

          <p className="appointment-time">
            <strong>Your Appointment Date:</strong><br />
            {selectedDate ? selectedDate.toDateString() : "Not selected"}
          </p>
        </div>

        {/* Right - Enter Details Form */}
        <div className="details-section">
          <h2>Enter Details</h2>

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

            <button type="submit" className="next-button">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterDetails;
