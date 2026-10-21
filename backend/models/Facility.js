const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    facilityName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true, // e.g. "Available 24/7 for resident scholars", "8:00 AM - 7:00 PM"
    },
    category: {
      type: String,
      default: 'General', // Academic, Hostel, Sports, Infrastructure, Transport
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Facility', facilitySchema);
