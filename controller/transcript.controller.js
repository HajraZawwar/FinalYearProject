const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const transcriptModel = require('../models/transcript.model.js');

const transcriptController = {
    getAllTranscripts: async (req, res) => {
        try {

            const [data, fields] = await transcriptModel.getAllTranscripts();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getTranscriptById: async (req, res) => {
        try {
            const TranscriptID = req.params.TranscriptID;
            const [data, fields] = await transcriptModel.getTranscriptById(TranscriptID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addTranscript: async (req, res) => {
        try {
            const StudentID = req.body.StudentID;
            const SemesterNumber = req.body.SemesterNumber;
            const CourseID = req.body.CourseID;
            const CourseGrade = req.body.CourseGrade;
            const SemesterGrade = req.body.SemesterGrade;

            const result = await transcriptModel.addTranscript(StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateTranscript: async (req, res) => {
        try {
            const StudentID = req.body.StudentID;
            const SemesterNumber = req.body.SemesterNumber;
            const CourseID = req.body.CourseID;
            const CourseGrade = req.body.CourseGrade;
            const SemesterGrade = req.body.SemesterGrade;
            const TranscriptID = req.body.TranscriptID;

            const result = await transcriptModel.updateTranscript(StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade, TranscriptID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteTranscript: async (req, res) => {
        try {
            const TranscriptID = req.params.TranscriptID;
            const result = await transcriptModel.deleteTranscript(TranscriptID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
    
};


module.exports = transcriptController;
