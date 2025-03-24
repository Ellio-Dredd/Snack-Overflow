
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import "../components/Styles.css"; // Import custom styles


const SelectAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNext = () => {
    if (selectedDate) {

      navigate("/EnterDetails", { state: { selectedDate } });

    } else {
      alert("Please select a date.");
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

        {/* Right - Full Calendar */}
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()} // Disable past dates
          />
        </div>
      </div>

      {/* Bottom - Next Button */}
      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectAppointment;
