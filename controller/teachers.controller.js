const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const teacherModel = require('../models/teachers.model.js');

const teacherController = {

    getAllTeachers: async (req, res) => {
        try {

            const [data, fields] = await teacherModel.getAllTeachers();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getTeacherById: async (req, res) => {
        try {
            const TeacherID = req.params.TeacherID;
            const [data, fields] = await teacherModel.getTeacherById(TeacherID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addTeacher: async (req, res) => {
        try {
            const TeacherCode = req.body.TeacherCode;
            const FirstName = req.body.FirstName;
            const LastName = req.body.LastName;
            const Age = req.body.Age;
            const Gender = req.body.Gender;
            const PhoneNo = req.body.PhoneNo;
            const Email = req.body.Email;
            const DepartmentID = req.body.DepartmentID;

            const result = await teacherModel.addTeacher(TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateTeacher: async (req, res) => {
        try {
            const TeacherCode = req.body.TeacherCode;
            const FirstName = req.body.FirstName;
            const LastName = req.body.LastName;
            const Age = req.body.Age;
            const Gender = req.body.Gender;
            const PhoneNo = req.body.PhoneNo;
            const Email = req.body.Email;
            const DepartmentID = req.body.DepartmentID;
            const TeacherID = req.body.TeacherID;

            const result = await teacherModel.updateTeacher(TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID, TeacherID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    deleteTeacher: async (req, res) => {
        try {
            const TeacherID = req.body.TeacherID;

            const result = await teacherModel.deleteTeacher(TeacherID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    }

};

module.exports = teacherController;