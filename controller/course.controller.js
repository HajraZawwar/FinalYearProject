const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const courseModel = require('../models/course.model.js');
const campusModel = require('../models/campus.model.js');
const sectionModel = require('../models/section.model.js');
const batchModel = require('../models/batch.model.js');
const semesterModel = require('../models/semester.model.js');

const courseController = {
    getAllCourses: async (req, res) => {
        try {

            const data = await courseModel.getAllCourses();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },
    // CourseRegistrationID, SemesterRegistrationID, MidPercentage, FinalPercentage, SessionalPercentage, CourseOfferingID
    registerCourse: async (req, res) => {
        try {
            const studentID = req.body.StudentID;
            const CourseOfferingID = req.body.CourseOfferingID;
            const MidPercentage = req.body.MidPercentage;
            const FinalPercentage = req.body.FinalPercentage;
            const SessionalPercentage = req.body.SessionalPercentage;

            const SemesterReg = await semesterModel.getSemesterRegistrationByStudentID(studentID);

            if (SemesterReg.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Student is not registered in any semester"));
                return;
            }

            // getting the semester reegistration id
            const SemesterRegistrationID = SemesterReg[0].SemesterRegistrationID;

            //get the courseRegId if it exists or not

            const isCourseReg = await courseModel.getCourseRegistrationIDBySemAndCourse(SemesterRegistrationID, CourseOfferingID);


            if (isCourseReg.length > 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is already registered"));
                return;
            }

            const result = await courseModel.registerCourse(SemesterRegistrationID, CourseOfferingID, MidPercentage, FinalPercentage, SessionalPercentage);
            res.json(config.responseGenerator(false, result, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },




    getAllRegisteredCourses: async (req, res) => {
        try {
            const data = await courseModel.getAllRegisteredCourses();
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    getAllOfferedCourses: async (req, res) => {
        try {
            const data = await courseModel.getAllOfferedCourses();
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getCourseById: async (req, res) => {
        try {
            const CourseID = req.params.CourseID;
            const [data, fields] = await courseModel.getCourseById(CourseID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    addCourse: async (req, res) => {
        try {
            const CourseName = req.body.CourseName;
            const CourseCode = req.body.CourseCode;
            const CreditHours = req.body.CreditHours;


            // Check if the course already exists
            const found = await courseModel.getCourseByCodeName(CourseCode);
            if (found != null) {
                res.json(config.responseGenerator(true, null, "Course already exists"));
                return;
            }

            const result = await courseModel.addCourse(CourseName, CourseCode, CreditHours);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }

    },

    updateCourse: async (req, res) => {
        try {
            const CourseName = req.body.CourseName;
            const CourseCode = req.body.CourseCode;
            const CreditHours = req.body.CreditHours;
            const CourseID = req.body.CourseID;

            const result = await courseModel.updateCourse(CourseName, CourseCode, CreditHours, CourseID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteCourse: async (req, res) => {
        try {
            const CourseID = req.body.CourseID;
            const result = await courseModel.deleteCourse(CourseID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    offerCourse: async (req, res) => {
        try {
            //courseOfferingID (auto increment), department, session, batch, section, campus, course, teacherID
            const DeptID = req.body.DepartmentID;
            const SessionID = req.body.SessionID;
            const BatchID = req.body.BatchID;
            const SectionID = req.body.SectionID;
            const CampusID = req.body.CampusID;
            const CourseID = req.body.CourseID;
            const teacherID = req.body.teacherID;

            const result = await courseModel.offerCourse(DeptID, SessionID, BatchID, SectionID, CampusID, CourseID, teacherID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },
    // SessionalID, CourseRegistrationID, SessionalName, ObtainedMarks, TotalMarks, Weightage
    addSessionalActivity: async function (req, res) {
        try {
            const courseOfferingID = req.body.CourseOfferingID;
            const studentID = req.body.StudentID;
            const sessionalName = req.body.SessionalName;
            const totalMarks = req.body.TotalMarks;
            const weightage = req.body.Weightage;

            const courseRegIds = await courseModel.getCourseRegIdByCourseOfferingId(courseOfferingID);

            if (courseRegIds.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is not registered"));
                return;
            }

            for (let i = 0; i < courseRegIds.length; i++) {
                const courseRegId = courseRegIds[i].CourseRegistrationID;
                const sessional = await courseModel.getSessionalByName(sessionalName, courseRegId);

                // check if the sessional already exists
                if (sessional.length > 0) {
                    res.status(500).json(config.responseGenerator(true, null, "Sessional already exists"));
                    return;
                }

                // adding the sessional activity
                await courseModel.addSectionalActivity(courseRegId, sessionalName, 0, totalMarks, weightage);
            };


            res.json(config.responseGenerator(false, "Sessional Added Succesfully", ""));

        } catch (error) {
            console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getAllSessionalsByCourseOffering: async function (req, res) {
        try {
            const courseOfferingID = req.query.CourseOfferingID;
            const data = await courseModel.getSessionalsListByCourseOffering(courseOfferingID);
            res.json(config.responseGenerator(false, data, ""));
        } catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    }

};

module.exports = courseController;
