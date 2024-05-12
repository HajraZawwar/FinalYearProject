const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const courseModel = require('../models/course.model.js');

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

    }

};

module.exports = courseController;
