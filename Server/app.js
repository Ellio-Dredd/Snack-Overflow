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



const StoreRoutes = require("./routes/StoreRoutes");
app.use("/api", StoreRoutes);



// Export app instance
module.exports = app;
