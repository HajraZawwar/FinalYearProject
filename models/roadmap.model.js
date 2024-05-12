const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');

const roadmapModel = {

    getAllRoadMaps: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getRoadMapById: async function (idroadmap) {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.findRoadmapById, [idroadmap]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getRoadMapByCourseID: async function (CourseID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.getRoadmapByCourseID, [CourseID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    addRoadMap: async function (CourseID, Pre_req_ID) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.addRoadmap, [CourseID, Pre_req_ID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateRoadMap: async function (CourseID, Pre_req_ID, idroadmap) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.updateRoadmap, [CourseID, Pre_req_ID, idroadmap]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    ifRoadMapExist: async function (CourseID, Pre_req_ID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.roadmapSQl.ifRoadMapExist, [CourseID, Pre_req_ID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },


    deleteRoadMap: async function (idroadmap) {
        try {
            const result = await db.executeQuery(sql.roadmapSQl.deleteRoadmap, [idroadmap]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = roadmapModel;