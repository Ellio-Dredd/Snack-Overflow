const express = require("express");
const { submitFeedback, getAllFeedback,deleteFeedback,analyzeFeedbackData } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedbacks", submitFeedback);
router.get("/feedbacks", getAllFeedback);
router.delete("/feedbacks/:id", deleteFeedback);
router.get("/feedbacks/analysis", analyzeFeedbackData);


module.exports = router;
