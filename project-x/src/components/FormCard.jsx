import  { useState } from "react";
import Box from "@mui/material/Box";

import axios from "axios";

export default function FormCard() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://rajapaksepharmacy.azurewebsites.net/api/feedbacks", formData);
      setStatus({ type: "success", message: response.data.message });
      setFormData({ name: "", phone: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Something went wrong" });
    }
  };

  return (
    <Box sx={{ width: "400px", bgcolor: "background.paper", padding: "20px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
      <form onSubmit={handleSubmit}>
        <h2>Contact Form</h2>
        
        {status && (
          <p style={{ color: status.type === "success" ? "green" : "red" }}>
            {status.message}
          </p>
        )}

        <div className="input-box">
          <label>Full Name</label>
          <input type="text" name="name" className="field" placeholder="Enter Your Name" required value={formData.name} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input type="tel" name="phone" className="field" placeholder="Enter Your Number" required value={formData.phone} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name="email" className="field" placeholder="Enter Your Email" required value={formData.email} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Your Message</label>
          <textarea name="message" className="field mess" placeholder="Enter Your Message" required value={formData.message} onChange={handleChange}></textarea>
        </div>

        <div className="btn-box">
          <button type="submit">Send Message</button>
        </div>
      </form>
    </Box>
  );
}
