const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const roadmapModel = require('../models/roadmap.model.js');

const roadmapController = {
    getAllRoadMaps: async (req, res) => {
        try {

            const [data, fields] = await roadmapModel.getAllRoadMaps();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getRoadMapById: async (req, res) => {
        try {
            const idroadmap = req.params.iproadmap;
            const [data, fields] = await roadmapModel.getRoadMapById(idroadmap);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addRoadMap: async (req, res) => {
        try {
            const CourseID = req.body.CourseID;
            const Pre_req_ID = req.body.Pre_req_ID;

            const result = await roadmapModel.addRoadMap(CourseID, Pre_req_ID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateRoadMap: async (req, res) => {
        try {
            const CourseID = req.body.CourseID;
            const Pre_req_ID = req.body.Pre_req_ID;
            const idroadmap = req.body.idroadmap;

            const result = await roadmapModel.updateRoadMap(CourseID, Pre_req_ID, idroadmap);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteRoadMap: async (req, res) => {
        try {
            const idroadmap = req.body.idroadmap;

            const result = await roadmapModel.deleteRoadMap(idroadmap);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }

};

module.exports = roadmapController;