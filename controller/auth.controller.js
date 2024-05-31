const config = require('./../constants/config.js');
// const studentController = require('./students.controller.js');
const studentModel = require('../models/students.model.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/roles.model.js');
const teacherModel = require('../models/teachers.model.js');
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

            console.log(teachers)



            // Then enter it into the login table
            for (const teacher of teachers) {

                let newUserName = teacher.FirstName + '.' + teacher.LastName;
                let login = await loginModel.getLoginByUserName(newUserName);
                let i = 1;
            
                // Loop until we get a login that does not exist
                while (login.length != 0) {
                    newUserName = teacher.FirstName + '.' + teacher.LastName + '' + i;
                    login = await loginModel.getLoginByUserName(newUserName);
                    i++;
                }

                const insertId = await loginModel.registerUser(newUserName, "123456789", teacherRoleId[0].roleId);

                const updateTeacherLogin = await teacherModel.updateTeacherLogin(insertId, teacher.TeacherID);

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
