const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');
const { register } = require('../middleware/auth.middleware');
const { get } = require('../routes/semester.route');

const semesterModel = {
    getAllSemesterRegistrations: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.semesterSQl.selectAllsemesterRegistrations);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getSemesterRegistrationByStudentID: async function (StudentID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.semesterSQl.getSemRegByStudentID, [StudentID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    registerSemester: async function (StudentID, SemesterNumber, SessionID, status) {
        try {
            // console.log(StudentID, SemesterNumber, SessionID, status)
            const [rows, fields] = await db.executeQuery(sql.semesterSQl.registerSemester, [StudentID, SemesterNumber, SessionID, status]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getSemesterRegistrationById: async function (SemesterRegistrationID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.semesterSQl.findSemesterRegistrationById, [SemesterRegistrationID]);
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
    updateSemsterNoAndReg :async function(SemesterRegistrationID, SemesterNumber, SessionID){
        try{
            const [rows, fields] = await db.executeQuery(sql.semesterSQl.updateSemesterNoAndSession, [SemesterNumber, SessionID, SemesterRegistrationID]);
            return rows;
        }catch(error){
            throw error;
        }
    }
};

module.exports = semesterModel;