const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true, // e.g. B.Tech, M.Tech, MBA, MCA
      trim: true,
    },
    duration: {
      type: String,
      required: true, // e.g. "4 Years (8 Semesters)"
    },
    eligibility: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    intakeSeats: {
      type: Number,
      default: 60,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
