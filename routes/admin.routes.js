const adminController = require('../controller/admin.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/generateStudentLoginsNULL', adminController.generateStudentLoginsNULL);



module.exports = router;
