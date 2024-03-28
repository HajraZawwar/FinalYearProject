const student = require('../controller/students.controller');
const express = require('express');

const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getall', student.getAllStudents);
router.get('/getbyid', student.getStudentById);
router.post('/addstudent', student.addStudent);
router.put('/updatestudent', student.updateStudent);
router.delete('/deletestudent', student.deleteStudent);

module.exports = router;
