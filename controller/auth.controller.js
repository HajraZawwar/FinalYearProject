const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
// const studentController = require('./students.controller.js');
const studentModel = require('../models/students.model.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/roles.model.js');
// const authMiddleware = require('../middleware/auth.middleware.js');

const authController = {

    generateStudentLoginNull: async function (req, res) {
        try {
            // Step 1: Get roll numbers for a section
            const students = await studentModel.nullLogin();

            if (students.length == 0) {
                res.json(config.responseGenerator(true, null, "No student exists with NULL logins"));
                return;
            }
            const studentRoleId = await roleModel.getRoleByName('studentzzzzzzzz');

            for (const student of students) {
                const insertId = await loginModel.registerUser(student.RollNo, student.FirstName + student.LastName, studentRoleId[0].roleId);

                const updateStudentLogin = await studentModel.updateStudentLogin(student.StudentID, insertId);

                if (updateStudentLogin.affectedRows === 0) {
                    throw new Error('Error updating student login');
                }
            }

            res.json(config.responseGenerator(false, null, "Student logins generated successfully"));

        } catch (error) {
            console.error('Error generating student logins:', error);
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    }
    ,
    generateTeacherLoginNull: async (req, res) => {
        try {
            // Step 1: Get roll numbers for a section
            const teachers = await teacherModel.nullLogin();
            const teacherRoleId = await roleModel.getRoleByName('teacher');

            for (const teacher of teachers) {
                const insertId = await loginModel.registerUser(teacher.FirstName + '.' + teacher.LastName, "123456789", teacherRoleId[0].roleId);

                const updateTeacherLogin = await teacherModel.updateTeacherLogin(teacher.TeacherID, insertId);

                if (updateTeacherLogin.affectedRows === 0) {
                    throw new Error('Error updating Teacher login');
                }
            }

            res.json(config.responseGenerator(false, null, "Logins generated successfully"));

        } catch (error) {
            console.error('Error generating student logins:', error);
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }


    }

};


module.exports = authController;
