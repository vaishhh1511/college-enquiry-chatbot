const mongoose = require('mongoose');

const collegeInfoSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    affiliation: {
      type: String,
      default: 'Autonomous Institution, Affiliated to Anna University, Chennai & Approved by AICTE',
    },
    accreditation: {
      type: String,
      default: 'Autonomous Institution',
    },
    campusTimings: {
      type: String,
      default: 'Monday to Saturday: 8:30 AM - 4:30 PM (Administrative office: 9:00 AM - 5:00 PM)',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CollegeInfo', collegeInfoSchema);
