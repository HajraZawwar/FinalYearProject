const adminController = require('../controller/admin.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/generateLoginsNULL', adminController.generateLoginNULL);



module.exports = router;
