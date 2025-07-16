const express = require("express");
const { submitFeedback, getAllFeedback,deleteFeedback,analyzeFeedbackData,updateFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedbacks", submitFeedback);
router.get("/feedbacks", getAllFeedback);
router.delete("/feedbacks/:id", deleteFeedback);
router.put("/feedbacks/:id", updateFeedback);
router.get("/feedbacks/analysis", analyzeFeedbackData);




module.exports = router;
