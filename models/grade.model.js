const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const gradeModel = {
    getAllGrades: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.gradeSQl.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addGrade: async function (SessionID, GradeName, MinPercentage, MaxPercentage) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.addGrade, [SessionID, GradeName, MinPercentage, MaxPercentage]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateGrade: async function (SessionID, GradeName, MinPercentage, MaxPercentage, GradeID) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.updateGrade, [SessionID, GradeName, MinPercentage, MaxPercentage, GradeID]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteGrade: async function (GradeID) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.deleteGrade, [GradeID]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = gradeModel;