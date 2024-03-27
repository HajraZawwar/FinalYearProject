const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');

const teacherModel = {

    getAllTeachers: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getTeacherById: async function (TeacherID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.selectTeacherById, [TeacherID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addTeacher: async function (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.addTeacher, [TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateTeacher: async function (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID, TeacherID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.updateTeacher, [TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID, TeacherID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteTeacher: async function (TeacherID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.deleteTeacher, [TeacherID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = teacherModel;