const db = require('../constants/db');
const sql = require('../constants/courseSQl');
const config = require('../constants/config');

const courseModel = {
    getAllCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.selectAll, null);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getCourseById: async function (CourseID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.findCourseById, [CourseID]);
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addCourse: async function (CourseName, CourseCode, CreditHours) {
        try {
            const result = await db.executeQuery(sql.courseSQl.addCourse, [CourseName, CourseCode, CreditHours]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateCourse: async function (CourseName, CourseCode, CreditHours, CourseID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.updateCourse, [CourseName, CourseCode, CreditHours, CourseID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteCourse: async function (CourseID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.deleteCourse, [CourseID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = courseModel;
