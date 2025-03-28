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


// Delete Feedbacks
const deleteFeedback  = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Feedback", error });
  }
};

module.exports = { submitFeedback, getAllFeedback ,deleteFeedback };


