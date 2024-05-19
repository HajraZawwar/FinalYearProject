const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const studentController = require('./students.controller.js');
const studentModel = require('../models/students.model.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/roles.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const authController = require('./auth.controller.js');

const adminController = {

    // It generates logins for all students in the database whose logins are not generated yet
    generateLoginNULL: async function (req, res) {
        try {
            const role = req.body.role;
            if (role == 'student')
                authController.generateStudentLoginNull(req, res);
            else if (role === "teacher")
                authController.generateTeacherLoginNull(req, res);
            else
                res.status(500).json(config.responseGenerator(true, null, "Invalid Role"));

        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },


}

module.exports = adminController;
