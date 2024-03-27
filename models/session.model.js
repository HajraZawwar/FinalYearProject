const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');

const sessionModel = {

    getAllSessions: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.sessionSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getSessionById: async function (SessionID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.sessionSQl.selectSessionById, [SessionID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addSession: async function (SessionName) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.addSession, [SessionName]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateSession: async function (SessionName, SessionID) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.updateSession, [SessionName, SessionID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteSession: async function (SessionID) {
        try {
            const result = await db.executeQuery(sql.sessionSQl.deleteSession, [SessionID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = sessionModel;