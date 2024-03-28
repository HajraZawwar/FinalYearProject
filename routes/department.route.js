const dept = require('../controller/department.controller')
const express = require('express');
const roadmap = require('../controller/roadmap.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getall', dept.getAllDepartments);
router.get('/getbyid', dept.getDepartmentById);
router.post('/adddepartment', dept.addDepartment);
router.put('/updatedepartment', dept.updateDepartment);
router.delete('/deletedepartment', dept.deleteDepartment);


module.exports = router;
