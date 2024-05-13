const config = require('../constants/config.js');
const studentModel = require('../models/students.model.js');

const studentController = {
    getAllStudents: async (req, res) => {
        try {

            const data = await studentModel.getAllStudents();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getStudentById: async (req, res) => {
        try {
            const StudentID = req.params.StudentID;
            const data = await studentModel.getStudentById(StudentID);
            if (data === null) {
                res.json(config.responseGenerator(true, [], "No student found with this ID"));
                return;
            }
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    getStudentByRollNo: async (req, res) => {
        try {
            const RollNo = req.params.RollNo;
            const data = await studentModel.getStudentByRollNo(RollNo);
            if (data === null) {
                res.json(config.responseGenerator(true, [], "No student found with this RollNo"));
                return;
            }
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
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
            const status = req.body.status;

            // Check if the student already exists
            const found = await studentModel.getStudentByRollNo(RollNo);

            if (found !== null) {
                res.json(config.responseGenerator(true, null, "Student already exists"));
                return;
            }

            const result = await studentModel.addStudent(RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status);

            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
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
            const StudentID = req.body.StudentID;
            const status = req.body.status;

            // Check if the student already exists
            const rows = await studentModel.getStudentById(StudentID);
            if (rows == null) {
                res.json(config.responseGenerator(true, null, "Student does not exist"));
                return;
            }

            const result = await studentModel.updateStudent(RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, StudentID, status);

            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getWhereLoginIsNull: async (req, res) => {
        try {
            const data = await studentModel.nullLogin();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const StudentID = req.body.StudentID;

            // Check if the student already exists
            const [rows, fields] = await studentModel.getStudentById(StudentID);
            if (rows.length === 0) {
                res.json(config.responseGenerator(true, null, "Student does not exist"));
                return;
            }

            const result = await studentModel.deleteStudent(StudentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error.message));
        }
    }


};

module.exports = studentController;
