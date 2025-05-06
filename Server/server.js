require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

    // Connect to MongoDB
    mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

// Start Server
app.listen(3000, () => {
  console.log(" Server is running at port 3000");
});