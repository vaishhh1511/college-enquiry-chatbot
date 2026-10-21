const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    companies: {
      type: [String],
      required: true, // e.g. ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture", "Cognizant"]
    },
    training: {
      type: String,
      required: true,
    },
    placementProcess: {
      type: [String],
      required: true,
    },
    highestPackage: {
      type: String,
      default: 'Please contact the college placement cell for the latest verified statistics.',
    },
    averagePackage: {
      type: String,
      default: 'Please contact the college placement cell for the latest verified statistics.',
    },
    placementRate: {
      type: String,
      default: 'Please contact the college placement cell for verified placement records.',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Placement', placementSchema);
