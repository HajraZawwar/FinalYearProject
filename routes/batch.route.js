const courseController = require('../controller/batch.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getall', courseController.getAllBatches);
router.get('/getbyid', courseController.getBatchById);
router.post('/addbatch', courseController.addBatch);
router.put('/updatebatch', courseController.updateBatch);
router.delete('/deletebatch', courseController.deleteBatch);



module.exports = router;
