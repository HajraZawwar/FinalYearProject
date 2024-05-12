const batchController = require('../controller/batch.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getall', batchController.getAllBatches);
router.get('/getbyid', batchController.getBatchById);
router.post('/addbatch', batchController.addBatch);
router.put('/updatebatch', batchController.updateBatch);
router.delete('/deletebatch', batchController.deleteBatch);



module.exports = router;
