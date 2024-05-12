const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const campusModel = require('../models/campus.model.js');

const campusController = {
    getAllCampuses: async (req, res) => {
        try {

            const data = await campusModel.getAllCampuses();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getCampusById: async (req, res) => {
        try {
            const CampusID = req.query.CampusID;

            console.log(CampusID);

            const data = await campusModel.getCampusById(CampusID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    addCampus: async (req, res) => {
        try {
            const CampusName = req.body.CampusName;

            const result = await campusModel.addCampus(CampusName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    updateCampus: async (req, res) => {
        try {
            const CampusName = req.body.CampusName;
            const CampusID = req.body.CampusID;

            const result = await campusModel.updateCampus(CampusName, CampusID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteCampus: async (req, res) => {
        try {
            const CampusID = req.params.CampusID;
            const result = await campusModel.deleteCampus(CampusID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
}

module.exports = campusController;