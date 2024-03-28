const section = require('../controller/section.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getall', section.getAllSections);
router.get('/getbyid', section.getSectionById);
router.post('/addsection', section.addSection);
router.put('/updatesection', section.updateSection);
router.delete('/deletesection', section.deleteSection);

module.exports = router;
