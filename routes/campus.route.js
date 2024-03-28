const campus = require('../controller/campus.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getall', campus.getAllCampuses);
router.get('/getbyid', campus.getCampusById);
router.post('/addcampus', campus.addCampus);
router.put('/updatecampus', campus.updateCampus);
router.delete('/deletecampus', campus.deleteCampus);



module.exports = router;
