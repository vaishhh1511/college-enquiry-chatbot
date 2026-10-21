const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/collegeController');

// GET /api/courses
router.get('/courses', getCourses);

module.exports = router;
