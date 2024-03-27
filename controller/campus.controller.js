const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const campusModel = require('../models/campus.model.js');

const campusController ={
    getAllCampuses: async (req, res) => {
        try {

            const [data, fields] = await campusModel.getAllCampuses();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getCampusById: async (req, res) => {
        try {
            const CampusID = req.params.CampusID;
            const [data, fields] = await campusModel.getCampusById(CampusID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addCampus: async (req, res) => {
        try {
            const CampusName = req.body.CampusName;

            const result = await campusModel.addCampus(CampusName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
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
            res.json(config.responseGenerator(true, null, error))
        }

    }, 

    deleteCampus: async (req, res) => {
        try {
            const CampusID = req.params.CampusID;
            const result = await campusModel.deleteCampus(CampusID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
}

module.exports = campusController;