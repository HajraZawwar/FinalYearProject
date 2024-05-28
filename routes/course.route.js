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
router.post('/addroadmap', roadmap.addRoadMap);
router.get('/getroadmapbyid', roadmap.getRoadMapById);
router.get('/getroadmap', roadmap.getAllRoadMaps);
router.put('/updateroadmap', roadmap.updateRoadMap);
router.delete('/deleteroadmap', roadmap.deleteRoadMap);
router.post('/offerCourse', courseController.offerCourse);
router.get('/getAllOfferedCourses', courseController.getAllOfferedCourses);
router.get('/getAllRegisteredCourses', courseController.getAllRegisteredCourses);
router.post('/registerCourse', courseController.registerCourse);
router.post('/addsessional', courseController.addSessionalActivity);
router.get('/getallSessionalbycourseoffering', courseController.getAllSessionalsByCourseOffering);
router.get('/getDetailsofStudentsinacourse', courseController.getDetailsOfStudentsInARegCourse);
router.get('/addsessionalmarks', courseController.addSessionalMarks);
router.get('/getStudentGradebookByCourseRegId', courseController.getStudentGradebookByCourseRegId);
module.exports = router;
router.put('/updateMidsTotal', courseController.updateMidsPercentage);