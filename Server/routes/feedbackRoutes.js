const express = require("express");
const { submitFeedback, getAllFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedbacks", submitFeedback);
router.get("/feedbacks", getAllFeedback);

module.exports = router;
