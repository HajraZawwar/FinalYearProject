const db = require('../constants/db');
const sql = require('../constants/sql');

const courseModel = {
    getAllCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.selectAll, null);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // CourseRegistrationID, SessionalName, ObtainedMarks, TotalMarks, Weightage
    addSectionalActivity: async function (courseRegId, name, obtainedMarks, totalMarks, weightage) {
        try {
            const result = await db.executeQuery(sql.courseSQl.addSessionnal, [courseRegId, name, obtainedMarks, totalMarks, weightage]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getCourseRegIdByCourseOfferingId: async function (courseOfferingID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.getCourseRegIDByCourseOffering, [courseOfferingID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getSessionalsListByCourseOffering: async function (courseOfferingID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.getAllSessionalsByCourseOffering, [courseOfferingID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },



    getSessionalByName: async function (name, courseRegId) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.getSessionalByName, [name, courseRegId]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getCourseRegistrationIDBySemAndCourse: async function (semsterReg, courseOfferingID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.getCourseRegistrationIDBySemAndCourse, [semsterReg, courseOfferingID]);
            return rows;
        }
        catch (error) {
            throw error;
        }
    },

    getAllRegisteredCourses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.courseSQl.getAllRegisteredCourses, null);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    registerCourse: async function (SemesterRegistrationID, CourseOfferingID, MidPercentage, FinalPercentage, SessionalPercentage) {
        try {
            // CourseRegistrationID, SemesterRegistrationID, MidPercentage, FinalPercentage, SessionalPercentage, CourseOfferingID
            const result = await db.executeQuery(sql.courseSQl.registerCourse, [SemesterRegistrationID, CourseOfferingID, MidPercentage, FinalPercentage, SessionalPercentage]);
            return result;
        }
        catch (error) {
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


    offerCourse: async function (departmentID, sessionID, batchID, sectionID, campusID, courseID, teacherID) {
        try {
            const result = await db.executeQuery(sql.courseSQl.offerCourse, [departmentID, sessionID, batchID, sectionID, campusID, courseID, teacherID]);
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
