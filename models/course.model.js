const db = require('../constants/db');
const courseQueries = require('../constants/courseQueries');
const config = require('../constants/config');

const courseModel = {
    getAllCourses: async function() {
        try {
            const [rows, fields] = await db.executeQuery(courseQueries.selectAll, null);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getCourseById: async function(courseId) {
        try {
            const [rows, fields] = await db.executeQuery(courseQueries.selectById, [courseId]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addCourse: async function(courseName, courseDescription, courseCredit) {
        try {
            const result = await db.executeQuery(courseQueries.addCourse, [courseName, courseDescription, courseCredit]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateCourse: async function(courseName, courseDescription, courseCredit, courseId) {
        try {
            const result = await db.executeQuery(courseQueries.updateCourse, [courseName, courseDescription, courseCredit,courseId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = courseModel;
