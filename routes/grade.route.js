const grade = require('../controller/grades.controller');
const express = require('express');
// const roadmap = require('../controller/');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getall', grade.getAllGrades);
router.get('/getbyid', grade.getGradeById);
router.post('/addgrade', grade.addGrade);
router.put('/updategrade', grade.updateGrade);
router.delete('/deletegrade', grade.deleteGrade);

module.exports = router;
