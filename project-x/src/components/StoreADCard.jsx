import  { useState } from "react";
import Box from "@mui/material/Box";

import axios from "axios";

export default function StoreADCard() {
  const [formData, setFormData] = useState({
    ItemID:"",
    ItemName: "",
    ItemDes: "",
    ItemPrice: "",
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
      const response = await axios.post("https://rajapaksepharmacy.azurewebsites.net/api/Store", formData);
      setStatus({ type: "success", message: response.data.message });
      setFormData({ ItemID:"",ItemName: "", ItemDes: "", ItemPrice: "", message: "" }); // Clear form
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Something went wrong" });
    }
  };

  return (
    <Box sx={{ width: "400px", bgcolor: "background.paper", padding: "20px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
      <form onSubmit={handleSubmit}>
        <h2>Item Add Form</h2>
        
        {status && (
          <p style={{ color: status.type === "success" ? "green" : "red" }}>
            {status.message}
          </p>
        )}

        <div className="input-box">
          <label>Item ID</label> 
          <input type="number" name="ItemID" className="field" placeholder="Enter Your ItemID" required value={formData.ItemID} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Item Name</label>
          <input type="text" name="ItemName" className="field" placeholder="Enter Your ItemName" required value={formData.ItemName} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Item Description</label>
          <input type="text" name="ItemDes" className="field" placeholder="Enter Your Item Description" required value={formData.ItemDes} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Item Price</label>
          <input type="number" name="ItemPrice" className="field" placeholder="Enter Your Item Price" required value={formData.ItemPrice} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label> Item Image URL</label>
          <textarea name="message" className="field mess" placeholder="Enter Your Image" required value={formData.message} onChange={handleChange}></textarea>
        </div>

        <div className="btn-box">
          <button type="submit">Add Item</button>
        </div>
      </form>
    </Box>
  );
}
