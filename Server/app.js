const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:5173", "https://rajapaksepharmacy.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(cors());


// Example Route
app.get("/", (req, res) => {
  res.send("Hello, this is the main API route!");
});

// Import & Use Routes (if any)
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api", feedbackRoutes);





const StoreRoutes = require("./routes/StoreRoutes");
app.use("/api", StoreRoutes);

//e channeling
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);


const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

//User Auth
const authRoutes = require("./routes/authRoutes.js");
app.use('/api/auth', authRoutes);


//Delivery
const DeliveryRoutes = require("./routes/deliveryRoutes.js");
app.use('/api/delivery', DeliveryRoutes);


const adminDeliveryRoutes = require('./routes/adminDeliverRoutes'); 
app.use('/api', adminDeliveryRoutes); //  this makes /api/admin-delivery available

//Admin routes
const isAdmin  = require('./middleware/admin.js');
const authMiddleware  = require('./middleware/auth.js');
app.get('/api/admin/dashboard', authMiddleware, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});


// Export app instance
module.exports = app;