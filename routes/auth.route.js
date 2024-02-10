const requireAuth = require('../middleware/auth.middleware.js');
const express = require('express');
const router = express.Router();


router.get('/getAllLogins', requireAuth.getAllLogins);

//This is just login
router.post('/login', requireAuth.login);

module.exports = router;


