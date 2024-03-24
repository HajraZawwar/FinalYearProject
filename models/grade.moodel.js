const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');

const gradeModel = {
    getAllGrades: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.gradeQueries.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addGrade: async function (studentId, courseId, grade) {
        try {
            const result = await db.executeQuery(query.gradeQueries.addGrade, [studentId, courseId, grade]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateGrade: async function (studentId, courseId, grade, gradeId) {
        try {
            const result = await db.executeQuery(query.gradeQueries.updateGrade, [studentId, courseId, grade, gradeId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteGrade: async function (gradeId) {
        try {
            const result = await db.executeQuery(query.gradeQueries.deleteGrade, [gradeId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = gradeModel;