const Feedback = require("../models/Feedback");
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

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


//update feedback
const updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error });
  }
};


//for sentiment || report genration 

const analyzeFeedbackData = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const sentimentCounts = { Positive: 0, Neutral: 0, Negative: 0 };

    feedbacks.forEach(item => {
      const result = sentiment.analyze(item.message); // analyzing 'message' field
      if (result.score > 0) sentimentCounts.Positive++;
      else if (result.score < 0) sentimentCounts.Negative++;
      else sentimentCounts.Neutral++;
    });

    res.json(sentimentCounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to analyze feedback", error });
  }
};


module.exports = { submitFeedback, getAllFeedback ,deleteFeedback,analyzeFeedbackData ,updateFeedback };


