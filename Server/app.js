const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Example Route
app.get("/", (req, res) => {
  res.send("Hello, this is the main API route!");
});

// Import & Use Routes (if any)
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api", feedbackRoutes);

<<<<<<< Updated upstream
=======


const StoreRoutes = require("./routes/StoreRoutes");
app.use("/api", StoreRoutes);

//e channeling
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

//Cart
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

//User Auth
const authRoutes = require("./routes/authRoutes.js");
app.use('/api/auth', authRoutes);

>>>>>>> Stashed changes
// Export app instance
module.exports = app;
