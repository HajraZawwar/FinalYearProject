const requireAuth = require('../middleware/auth.middleware.js');
const express = require('express');
const router = express.Router();


router.get('/getAllLogins', requireAuth.getAllLogins);

router.post('/login', requireAuth.login);

module.exports = router;


