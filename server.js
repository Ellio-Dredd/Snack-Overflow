require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 3000;



    // Connect to MongoDB
    mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running at port ${PORT}`);
});