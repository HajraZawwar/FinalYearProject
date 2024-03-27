const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');

const studentModel = {
    getAllStudents: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.studentQueries.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getStudentById: async function (studentId) {
        try {
            const [rows, fields] = await db.executeQuery(query.studentQueries.findStudentById, [studentId]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addStudent: async function (firstName, lastName, email, batchId) {
        try {
            const result = await db.executeQuery(query.studentQueries.addStudent, [firstName, lastName, email, batchId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateStudent: async function (firstName, lastName, email, batchId, studentId) {
        try {
            const result = await db.executeQuery(query.studentQueries.updateStudent, [firstName, lastName, email, batchId, studentId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteStudent: async function (studentId) {
        try {
            const result = await db.executeQuery(query.studentQueries.deleteStudent, [studentId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = studentModel;
