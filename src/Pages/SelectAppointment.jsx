import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import "../styles.css"; // Import our custom styles

const SelectAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      navigate("/enter-details", { 
        state: { 
          selectedDate: selectedDate.toDateString(), // Convert to readable format
          selectedTime 
        } 
      });
    } else {
      alert("Please select a date and time.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Book Your Appointment</h2>

      <div className="appointment-container">
        {/* Left - Pharmacy Details */}
        <div className="pharmacy-section">
          <h3>Rajapakse Pharmacy</h3>
          <p>Schedule your appointment today, and our team will promptly reach out to confirm your booking!</p>

          <p className="pharmacy-address">
            <strong>Pharmacy Address:</strong><br />
            <span className="blue-text">Rajapakse Pharmacy,</span><br />
            No:456, Kurunegala Road,<br />
            Madampe 61230
          </p>
        </div>

        {/* Middle - Full Calendar */}
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()} // Disable past dates
          />
        </div>

        {/* Right - Time Slots */}
        <div className="time-section">
          {["08:30 - 08:45", "09:00 - 09:15", "10:00 - 10:15", "10:30 - 10:45", "11:00 - 11:15"].map((time) => (
            <button
              key={time}
              className={`time-button ${selectedTime === time ? "selected" : ""}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom - Next Button */}
      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectAppointment;
