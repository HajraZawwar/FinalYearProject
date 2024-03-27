const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const studentModel = require('../models/students.model.js');

const studentController = {
    getAllStudents: async (req, res) => {
        try {

            const [data, fields] = await studentModel.getAllStudents();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    getSetudentById: async (req, res) => {
        try {
            const StudentID = req.params.StudentID;
            const [data, fields] = await studentModel.getStudentById(StudentID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addStudent: async (req, res) => {
        try {
            const RollNo = req.body.RollNo;
            const FirstName = req.body.FirstName;
            const LastName = req.body.LastName;
            const Age = req.body.Age;
            const Gender = req.body.Gender;
            const City = req.body.City;
            const Country = req.body.Country;
            const PhoneNo = req.body.PhoneNo;
            const Address = req.body.Address;
            const BatchID = req.body.BatchID;
            const CampusID = req.body.CampusID;
            const SectionID = req.body.SectionID;
            const DepartmentID = req.body.DepartmentID;
            
            const result = await studentModel.addStudent(RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    updateStudent: async (req, res) => {
        try {
            const RollNo = req.body.RollNo;
            const FirstName = req.body.FirstName;
            const LastName = req.body.LastName;
            const Age = req.body.Age;
            const Gender = req.body.Gender;
            const City = req.body.City;
            const Country = req.body.Country;
            const PhoneNo = req.body.PhoneNo;
            const Address = req.body.Address;
            const BatchID = req.body.BatchID;
            const CampusID = req.body.CampusID;
            const SectionID = req.body.SectionID;
            const DepartmentID = req.body.DepartmentID;
            
            const result = await studentModel.updateStudent(RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const StudentID = req.body.StudentID;
            const result = await studentModel.deleteStudent(StudentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    }


};

module.exports = studentController;
