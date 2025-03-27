const express = require("express");
const { submitFeedback, getAllFeedback,deleteFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedbacks", submitFeedback);
router.get("/feedbacks", getAllFeedback);
router.delete("/feedbacks/:id", deleteFeedback);

module.exports = router;
