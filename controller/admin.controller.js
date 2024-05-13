const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const studentController = require('./students.controller.js');
const studentModel = require('../models/students.model.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/roles.model.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const adminController = {

    // It generates logins for all students in the database whose logins are not generated yet
    generateStudentLoginsNULL: async (req, res) => {
        try {
            // Step 1: Get roll numbers for a section
            const students = await studentModel.nullLogin();
            const studentRoleId = await roleModel.getRoleByName('studentzzzzzzzz');

            for(const student of students){
                const insertId = await loginModel.registerUser(student.RollNo, student.FirstName + student.LastName, studentRoleId[0].roleId);

                const updateStudentLogin = await studentModel.updateStudentLogin(student.StudentID, insertId);

                if(updateStudentLogin.affectedRows === 0){
                    throw new Error('Error updating student login');
                }
            }

            res.json(config.responseGenerator(false, null, "Student logins generated successfully"));

        } catch (error) {
            console.error('Error generating student logins:', error);
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },
}

module.exports = adminController;
