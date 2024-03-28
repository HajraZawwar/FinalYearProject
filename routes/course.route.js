const courseController = require('../controller/course.controller');
const express = require('express');
const roadmap = require('../controller/roadmap.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getall', courseController.getAllCourses);
router.get('/getbyid', courseController.getCourseById);
router.post('/addcourse', courseController.addCourse);
router.put('/updatecourse', courseController.updateCourse);
router.delete('/deletecourse', courseController.deleteCourse);
router.post('addroadmap', roadmap.addRoadMap);
router.get('/getroadmap', roadmap.getAllRoadMaps);
router.put('/updateroadmap', roadmap.updateRoadMap);
router.delete('/deleteroadmap', roadmap.deleteRoadMap);


module.exports = router;
