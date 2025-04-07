require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

    // Connect to MongoDB
    mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

// Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
