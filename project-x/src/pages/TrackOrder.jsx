import { useState } from "react";
import axios from "axios";

export default function TrackOrder() {
  const [userId, setUserId] = useState("");
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/delivery/${userId}`);
      setDelivery(response.data);
      setError("");
    } catch (err) {
      setError("Order not found.");
      setDelivery(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Track Your Order</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleTrack}>Track</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {delivery && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(delivery.estimatedTime).toLocaleString()}</p>
          <p><strong>Actual Delivery:</strong> {delivery.actualTime ? new Date(delivery.actualTime).toLocaleString() : "Pending"}</p>
        </div>
      )}
    </div>
  );
}
