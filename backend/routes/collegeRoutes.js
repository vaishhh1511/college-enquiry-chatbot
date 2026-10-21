const express = require('express');
const router = express.Router();
const {
  getCollegeInfo,
  getAdmissions,
  getFees,
  getFacilities,
  getPlacements,
  getFAQs,
} = require('../controllers/collegeController');

// GET /api/college
router.get('/college', getCollegeInfo);

// GET /api/admissions
router.get('/admissions', getAdmissions);

// GET /api/fees
router.get('/fees', getFees);

// GET /api/facilities
router.get('/facilities', getFacilities);

// GET /api/placements
router.get('/placements', getPlacements);

// GET /api/faqs
router.get('/faqs', getFAQs);

module.exports = router;
