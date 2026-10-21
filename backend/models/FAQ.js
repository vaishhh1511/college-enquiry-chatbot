const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g. "Admissions", "Fees", "Hostel", "Academics", "Scholarships", "Clubs", "Examinations"
      trim: true,
    },
    keywords: {
      type: [String],
      required: true, // e.g. ["hostel", "rooms", "wifi", "mess"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FAQ', faqSchema);
