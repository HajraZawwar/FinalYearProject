const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const sectionModel = require('../models/section.model.js');

const sectionController = {

    getAllSections: async (req, res) => {
        try {

            const data = await sectionModel.getAllSections();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getSectionById: async (req, res) => {
        try {
            const SectionID = req.query.SectionID;
            const data = await sectionModel.getSectionByid(SectionID);

            if (data === null) {
                res.json(config.responseGenerator(true, [], "No section found with this ID"));
                return;
            }

            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    addSection: async (req, res) => {
        try {
            const SectionName = req.body.SectionName;

            const result = await sectionModel.addSection(SectionName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    updateSection: async (req, res) => {
        try {
            const SectionName = req.body.SectionName;
            const SectionID = req.body.SectionID;

            const data = await sectionModel.getSectionByid(SectionID);

            if(data === null){
                res.json(config.responseGenerator(true, [], "No section found with this ID"));
                return;
            }

            const result = await sectionModel.updateSection(SectionName, SectionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteSection: async (req, res) => {
        try {
            const SectionID = req.body.SectionID;

            const result = await sectionModel.deleteSection(SectionID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
};

module.exports = sectionController;