const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const studentModel = {
    getAllStudents: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getStudentById: async function (StudentID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findStudentById, [StudentID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addStudent: async function (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.studentSQl.addStudent, [RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateStudent: async function (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, StudentID) {
        try {
            const result = await db.executeQuery(sql.studentSQl.updateStudent, [RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, StudentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteStudent: async function (StudentID) {
        try {
            const result = await db.executeQuery(sql.studentSQl.deleteStudent, [StudentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = studentModel;
