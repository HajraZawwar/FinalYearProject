const semesterController = require('../controller/semester.controller.js');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getallsemreg',semesterController.getAllSemesterRegistrations);
router.post('/registersemester',semesterController.registerSemester);
router.post('/promotestudents',semesterController.promoteStudents);




module.exports = router;
