const adminController = require('../controller/admin.controller');
const express = require('express');
const router = express.Router();


router.get('/getall',adminController.getAllCourses);

module.exports= router;
