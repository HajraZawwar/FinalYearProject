const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const { getAllSupervisors } = require('../controller/teachers.controller.js');

const teacherModel = {

    getAllTeachers: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getSupervisorByDeptID: async function (DepartmentID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.getSuperVisorByDept, [DepartmentID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getSupervisorByID: async function (TeacherID) {
        try {
            cosnt[rows, fields] = await db.executeQuery(sql.teacherSQl.getSupervisorByID, [TeacherID]);
            return rows;

        }
        catch (error) { throw error; }

    },
    getAllSupervisors: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.getAllSupervisors);
            return rows;
        } catch (error) {
            throw error;
        }
    },


    updateSupervisor: async function (TeacherID, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.editSupervisor, [DepartmentID, TeacherID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
    ,
    addSupervisor: async function (TeacherID, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.addSupervisor, [TeacherID, DepartmentID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
    ,

    updateTeacherLogin: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.teacherSQl.updateLogin);
            return rows;
        }
        catch (error) {
            throw error;
        }

    },

    nullLogin: async function () {
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
            throw error;
        }
    },

    addTeacher: async function (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.addTeacher, [TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateTeacher: async function (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID, TeacherID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.updateTeacher, [TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID, TeacherID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteTeacher: async function (TeacherID) {
        try {
            const result = await db.executeQuery(sql.teacherSQl.deleteTeacher, [TeacherID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = teacherModel;