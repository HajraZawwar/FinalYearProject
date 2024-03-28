const session = require('../controller/session.controller');
const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getall', session.getAllSessions);
router.get('/getbyid', session.getSessionById);
router.post('/addsession', session.addSession);
router.put('/updatesession', session.updateSession);
router.delete('/deletesession', session.deleteSession);

module.exports = router;
