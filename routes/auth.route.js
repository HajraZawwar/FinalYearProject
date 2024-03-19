const requireAuth = require('../middleware/auth.middleware.js');
const express = require('express');
const router = express.Router();

router.post('/register', requireAuth.register);
router.post('/login', requireAuth.login);
// router.get('/profile', requireAuth.verifyToken, (req, res) => {
//     res.json(config.responseGenerator(false, req.user, "Token verified"));
// });

// Route accessible only to users with admin role
router.get('/admin', requireAuth.verifyToken, requireAuth.isAdmin, (req, res) => {
    res.json(config.responseGenerator(false, req.user, "Admin access granted"));
});

// Route accessible only to users with student role
router.get('/student', requireAuth.verifyToken, requireAuth.isStudent, (req, res) => {
    res.json(config.responseGenerator(false, req.user, "Student access granted"));
});

// Route accessible only to users with teacher role
router.get('/teacher', requireAuth.verifyToken, requireAuth.isTeacher, (req, res) => {
    res.json(config.responseGenerator(false, req.user, "Teacher access granted"));
});

module.exports = router;
