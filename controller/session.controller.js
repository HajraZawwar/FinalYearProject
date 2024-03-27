const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const sessionModel = require('../models/session.model.js');

const sessionController = {
    getAllSessions: async (req, res) => {
        try {

            const [data, fields] = await sessionModel.getAllSessions();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getSessionById: async (req, res) => {
        try {
            const SessionID = req.params.SessionID;
            const [data, fields] = await sessionModel.getSessionById(SessionID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addSession: async (req, res) => {
        try {
            const SessionName = req.body.SessionName;

            const result = await sessionModel.addSession(SessionName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateSession: async (req, res) => {
        try {
            const SessionName = req.body.SessionName;
            const SessionID = req.body.SessionID;

            const result = await sessionModel.updateSession(SessionName, SessionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteSession: async (req, res) => {
        try {
            const SessionID = req.body.SessionID;

            const result = await sessionModel.deleteSession(SessionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
};

module.exports = sessionController;