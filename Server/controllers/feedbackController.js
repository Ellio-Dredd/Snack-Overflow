const Feedback = require("../models/Feedback");

// Submit Feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const feedback = new Feedback({ name, phone, email, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Feedback (For Admin Panel)
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitFeedback, getAllFeedback };
