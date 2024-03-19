const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');

const courseModel = {
    getAllCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.courseQueries.selectAll, null);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getCourseById: async function (courseId) {
        try {
            const [rows, fields] = await db.executeQuery(query.courseQueries.findCourseById, [courseId]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addCourse: async function (courseName, courseDescription, courseCredit) {
        try {
            const result = await db.executeQuery(query.courseQueries.addCourse, [courseName, courseDescription, courseCredit]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateCourse: async function (courseName, courseDescription, courseCredit, courseId) {
        try {
            const result = await db.executeQuery(query.courseQueries.updateCourse, [courseName, courseDescription, courseCredit, courseId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = courseModel;
