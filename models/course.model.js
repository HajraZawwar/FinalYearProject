const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const courseModel = {
    getAllCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.selectAll, null);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getAllOfferedCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.selectAllOferedCourses, null);
            return rows;
        } catch (error) {
            throw error;
        }
    },


    offerCourse: async function (departmentID, sessionID, batchID, sectionID, campusID, courseID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.offerCourse, [departmentID, sessionID, batchID, sectionID, campusID, courseID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getCourseByCodeName: async function (CourseCode) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.findCourseByCode, [CourseCode]);
            if (rows.length > 0) {
                return rows;
            }
            else {
                return null;
            }
        } catch (error) {
            throw error;
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
            throw error;
        }
    },

    addCourse: async function (CourseName, CourseCode, CreditHours) {
        try {
            const result = await db.executeQuery(sql.courseSQl.addCourse, [CourseName, CourseCode, CreditHours]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateCourse: async function (CourseName, CourseCode, CreditHours, CourseID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.updateCourse, [CourseName, CourseCode, CreditHours, CourseID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteCourse: async function (CourseID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.deleteCourse, [CourseID]);
            return result;
        } catch (error) {
          throw error;
        }
    }
};

module.exports = courseModel;
