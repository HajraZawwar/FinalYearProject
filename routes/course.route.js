const courseController = require('../controller/course.controller');
const express = require('express');
const router = express.Router();


router.get('/getall', courseController.getAllCourses);
router.get('/getbyid', courseController.getCourseById);
router.post('/addcourse', courseController.addCourse);

module.exports = router;
