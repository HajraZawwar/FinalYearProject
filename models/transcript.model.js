const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const transcriptModel = {
    getAllTranscripts: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.transcriptSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getTranscriptById: async function (TranscriptID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.transcriptSQl.findTranscriptById, [TranscriptID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addTranscript: async function (StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade) {
        try {
            const result = await db.executeQuery(sql.transcriptSQl.addTranscript, [StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateTranscript: async function (StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade, TranscriptID) {
        try {
            const result = await db.executeQuery(sql.transcriptSQl.updateTranscript, [StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade, TranscriptID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteTranscript: async function (TranscriptID) {
        try {
            const result = await db.executeQuery(sql.transcriptSQl.deleteTranscript, [TranscriptID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = transcriptModel;
