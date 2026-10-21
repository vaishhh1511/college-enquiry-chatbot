const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    tuitionFee: {
      type: String,
      required: true, // e.g. "₹85,000 per year"
    },
    otherFees: {
      type: String,
      required: true, // e.g. "₹15,000 (Lab, Library, Examination)"
    },
    notes: {
      type: String,
      required: true, // e.g. "Hostel & Bus transport fees are charged separately."
    },
    installmentOptions: {
      type: String,
      default: 'Available in two equal semester installments',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fee', feeSchema);
