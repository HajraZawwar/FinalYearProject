const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const sectionModel = require('../models/section.model.js');

const sectionController = {

    getAllSections: async (req, res) => {
        try {

            const [data, fields] = await sectionModel.getAllSections();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getSectionById: async (req, res) => {
        try {
            const SectionID = req.params.SectionID;
            const [data, fields] = await sectionModel.getSectionById(SectionID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addSection: async (req, res) => {
        try {
            const SectionName = req.body.SectionName;

            const result = await sectionModel.addSection(SectionName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateSection: async (req, res) => {
        try {
            const SectionName = req.body.SectionName;
            const SectionID = req.body.SectionID;

            const result = await sectionModel.updateSection(SectionName, SectionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteSection: async (req, res) => {
        try {
            const SectionID = req.body.SectionID;

            const result = await sectionModel.deleteSection(SectionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
};

module.exports = sectionController;