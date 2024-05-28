const roleController = require('../controller/roles.controller');
const express = require('express');

const router = express.Router();

router.get('/getall', roleController.getAllRoles);
router.get('/getbyid', roleController.getRoleById);
router.post('/addrole', roleController.addRole);
router.put('/updaterole', roleController.updateRole);
router.delete('/deleterole', roleController.deleteRole);

module.exports = router;
