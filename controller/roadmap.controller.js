const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const roadmapModel = require('../models/roadmap.model.js');

const roadmapController = {
    getAllRoadMaps: async (req, res) => {
        try {

            const data = await roadmapModel.getAllRoadMaps();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getRoadMapById: async (req, res) => {
        try {
            const idroadmap = req.params.iproadmap;
            const [data, fields] = await roadmapModel.getRoadMapById(idroadmap);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },


    addRoadMap: async (req, res) => {
        try {
            const CourseID = req.body.CourseID;
            const Pre_req_ID = req.body.Pre_req_ID;

            if(CourseID == Pre_req_ID){
                res.json(config.responseGenerator(true, null, "Course cannot be pre-requisite of itself"));
                return;
            }

            // Check if the roadmap already exists
            const found = await roadmapModel.ifRoadMapExist(CourseID,Pre_req_ID);

            if (found.length > 0) {
                res.json(config.responseGenerator(true, null, "Roadmap already exists"));
                return;
            }

            const result = await roadmapModel.addRoadMap(CourseID, Pre_req_ID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    updateRoadMap: async (req, res) => {
        try {
            const CourseID = req.body.CourseID;
            const Pre_req_ID = req.body.Pre_req_ID;
            const idroadmap = req.body.idroadmap;

            // Check if the roadmap already exists
            const found = await roadmapModel.getRoadMapById(idroadmap);

            if (found.length == 0) {
                res.json(config.responseGenerator(true, null, "Roadmap does not exist"));
                return;
            }

            const result = await roadmapModel.updateRoadMap(CourseID, Pre_req_ID, idroadmap);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteRoadMap: async (req, res) => {
        try {


            const idroadmap = req.body.idroadmap;
            // Check if the roadmap already exists
            const found = await roadmapModel.getRoadMapById(idroadmap);

            if (found.length == 0) {
                res.json(config.responseGenerator(true, null, "Roadmap does not exist"));
                return;
            }

            const result = await roadmapModel.deleteRoadMap(idroadmap);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }

};

module.exports = roadmapController;