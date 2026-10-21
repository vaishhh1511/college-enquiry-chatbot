const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    admissionProcess: {
      type: [String],
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    requiredDocuments: {
      type: [String],
      required: true,
    },
    applicationMethod: {
      type: String,
      required: true,
    },
    importantInformation: {
      type: String,
      required: true,
    },
    applicationPortalUrl: {
      type: String,
      default: 'https://srmeaswari.ac.in',
    },
    helplinePhone: {
      type: String,
      default: '+91 44 4392 3041',
    },
    helplineEmail: {
      type: String,
      default: 'admissions@eec.srmrmp.edu.in',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', admissionSchema);
