const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const sessionModel = require('../models/session.model.js');

const sessionController = {
    getAllSessions: async (req, res) => {
        try {

            const data = await sessionModel.getAllSessions();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getSessionById: async (req, res) => {
        try {
            const SessionID = req.params.SessionID;
            const data = await sessionModel.getSessionById(SessionID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    addSession: async (req, res) => {
        try {
            const SessionName = req.body.SessionName;
            const StartDate = req.body.StartDate;
            const EndDate = req.body.EndDate;

            const result = await sessionModel.addSession(SessionName, StartDate, EndDate);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getSessionByName: async (req, res) => {
        try {
            const SessionName = req.params.SessionName;
            const data = await sessionModel.getSessionByName(SessionName);

            if(data.length == 0){
                res.json(config.responseGenerator(true, null, "Session not found"));
                return;
            }
        
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    updateSession: async (req, res) => {
        try {
            const SessionName = req.body.SessionName;
            const SessionID = req.body.SessionID;
            const StartDate = req.body.StartDate;
            const EndDate = req.body.EndDate;

            console.log(req.body)


            const result = await sessionModel.updateSession(SessionName, SessionID, StartDate, EndDate);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteSession: async (req, res) => {
        try {
            const SessionID = req.body.SessionID;

            const result = await sessionModel.deleteSession(SessionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
};

module.exports = sessionController;