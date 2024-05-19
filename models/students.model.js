const db = require('../constants/db');
const sql = require('../constants/sql');


const studentModel = {


    getAllStudents: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getSpecificStudents: async function (BatchID, SectionID, CampusID, DepartmentID) {
        try {
           
            const [rows, fields] = await db.executeQuery(sql.studentSQl.selectSpecificStudents, [BatchID, SectionID, CampusID, DepartmentID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    updateStudentLogin: async function (StudentID, Login) {
        try {
            const result = await db.executeQuery(sql.studentSQl.updateStudentLogin, [Login, StudentID]);
            return result;
        } catch (error) {
            throw error;
        }
    },


    nullLogin: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findWhereLoginIsNull);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getStudentByRollNo: async function (RollNo) {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findStudentByRollNo, [RollNo]);

            if (rows.length === 0) {
                return null;
            }

            return rows;
        }
        catch (error) {

            throw error;
        }
    },


    getStudentById: async function (StudentID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findStudentById, [StudentID]);

            if (rows.length === 0) {
                return null;
            }

            return rows;
        } catch (error) {
            throw error;
        }
    },

    addStudent: async function (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status) {
        try {


            const result = await db.executeQuery(sql.studentSQl.addStudent, [RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status]);
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    updateStudent: async function (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, StudentID, status) {
        try {

            // Check if the student already exists
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findStudentById, [StudentID]);

            if (rows.length === 0) {
                throw new Error("Student does not exist");
            }
            const result = await db.executeQuery(sql.studentSQl.updateStudent, [RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status, StudentID,]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteStudent: async function (StudentID) {
        try {
            // Check if the student already exists
            const [rows, fields] = await db.executeQuery(sql.studentSQl.findStudentById, [StudentID]);

            if (rows.length === 0) {
                throw new Error("Student does not exist");
            }

            const result = await db.executeQuery(sql.studentSQl.deleteStudent, [StudentID]);
            return result;


        } catch (error) {
            throw error;
        }
    }
};

module.exports = studentModel;
