const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const gradeModel = require('../models/grades.model.js');

const gradeController = {
    getAllGrades: async (req, res) => {
        try {

            const [data, fields] = await gradeModel.getAllGrades();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }, 

    getGradeById: async (req, res) => {
        try {
            const GradeID = req.params.GradeID;
            const [data, fields] = await gradeModel.getGradeById(GradeID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addGrade: async (req, res) => {
        try {
            const SessionID = req.body.SessionID;
            const GradeName = req.body.GradeName;
            const MinPercentage = req.body.MinPercentage;
            const MaxPercentage = req.body.MaxPercentage;

            const result = await gradeModel.addGrade(SessionID, GradeName, MinPercentage, MaxPercentage);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateGrade: async (req, res) => {
        try {
            const SessionID = req.body.SessionID;
            const GradeName = req.body.GradeName;
            const MinPercentage = req.body.MinPercentage;
            const MaxPercentage = req.body.MaxPercentage;
            const GradeID = req.body.GradeID;

            const result = await gradeModel.updateGrade(SessionID, GradeName, MinPercentage, MaxPercentage, GradeID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteGrade: async (req, res) => {
        try {
            const GradeID = req.params.GradeID;
            const result = await gradeModel.deleteGrade(GradeID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    }

};

module.exports = gradeController;