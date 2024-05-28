const facultyController = require('../controller/teachers.controller.js');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getall', facultyController.getAllTeachers);
router.get('/getbyid', facultyController.getTeacherById);
router.post('/addteacher', facultyController.addTeacher);
router.post('/addsupervisor', facultyController.addSupervisor);
router.get('/getallsupervisors', facultyController.getAllSupervisors);
router.put('/updateteacher', facultyController.updateTeacher);
router.put('/updatesupervisor', facultyController.updateSupervisor);
router.delete('/deleteteacher', facultyController.deleteTeacher);



module.exports = router;
