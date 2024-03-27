const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');


const transcriptModel = {
    getAllTranscripts: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.transcriptQueries.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getTranscriptById: async function (transcriptId) {
        try {
            const [rows, fields] = await db.executeQuery(query.transcriptQueries.findTranscriptById, [transcriptId]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addTranscript: async function (studentId, courseId, grade) {
        try {
            const result = await db.executeQuery(query.transcriptQueries.addTranscript, [studentId, courseId, grade]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateTranscript: async function (studentId, courseId, grade, transcriptId) {
        try {
            const result = await db.executeQuery(query.transcriptQueries.updateTranscript, [studentId, courseId, grade, transcriptId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteTranscript: async function (transcriptId) {
        try {
            const result = await db.executeQuery(query.transcriptQueries.deleteTranscript, [transcriptId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = transcriptModel;
