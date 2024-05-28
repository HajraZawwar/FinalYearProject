const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const gradeModel = {
    getAllGrades: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.gradeSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getGradeByMarks: async function (Marks)
    {
        try {
            const [rows, fields] = await db.executeQuery(sql.gradeSQl.getGradeByMarks, [Marks]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getGradeByGradeName: async function (GradeName) {
        try {
            const [rows, fields] = await db.executeQuery(sql.gradeSQl.selectGradeByName, [GradeName]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getGradeById: async function (GradeID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.gradeSQl.selectGradeById, [GradeID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addGrade: async function (SessionID, GradeName, MinPercentage, MaxPercentage) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.addGrade, [SessionID, GradeName, MinPercentage, MaxPercentage]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateGrade: async function (SessionID, GradeName, MinPercentage, MaxPercentage, GradeID) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.updateGrade, [SessionID, GradeName, MinPercentage, MaxPercentage, GradeID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteGrade: async function (GradeID) {
        try {
            const result = await db.executeQuery(sql.gradeSQl.deleteGrade, [GradeID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = gradeModel;