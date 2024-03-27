const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');

const roadmapModel = {

    getAllRoadMaps: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getRoadMapById: async function (idroadmap) {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.selectRoadMapById, [idroadmap]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addRoadMap: async function (CourseID, Pre_req_ID) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.addRoadMap, [CourseID, Pre_req_ID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }, 

    updateRoadMap: async function (CourseID, Pre_req_ID, idroadmap) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.updateRoadMap, [CourseID, Pre_req_ID, idroadmap]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteRoadMap: async function (idroadmap) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.deleteRoadMap, [idroadmap]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = roadmapModel;