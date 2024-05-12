const db = require('../constants/db.js');
const sql = require('../constants/sql.js');

const sessionModel = {

    getAllSessions: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.sessionSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getSessionById: async function (SessionID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.sessionSQl.selectSessionById, [SessionID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getSessionByName: async function (SessionName) {
        try {
            const [rows, fields] = await db.executeQuery(sql.sessionSQl.getSessionByName, [SessionName]); 
            return rows;
        } catch (error) {
            throw error;
        }
    }
    ,

    addSession: async function (SessionName, StartDate, EndDate) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.addSession, [SessionName, StartDate, EndDate]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateSession: async function (SessionName, SessionID, StartDate, EndDate) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.updateSession, [SessionName, StartDate, EndDate, SessionID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteSession: async function (SessionID) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.deleteSession, [SessionID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = sessionModel;