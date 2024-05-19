
const config = require('./../constants/config.js');
const semesterModel = require('../models/semester.model.js');
const studentModel = require('../models/students.model.js');
const statusModel = require('../models/status.model.js');

const semesterController = {
    // SemesterRegistrationID, StudentID, SemesterNumber, SessionID, status

    getAllSemesterRegistrations: async (req, res) => {
        try {

            const data = await semesterModel.getAllSemesterRegistrations();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    registerSemester: async (req, res) => {
        // SemesterRegistrationID, StudentID, SemesterNumber, SessionID, status
        try {
            const { StudentID, SemesterNumber, SessionID, status } = req.body;
            const data = await semesterModel.registerSemester(StudentID, SemesterNumber, SessionID, status);

            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    }
    ,

    changeSemesterStatus: async (req, res) => {
        try {
            const { SemesterRegistrationID, status } = req.body;
            const data = await semesterModel.changeSemesterStatus(SemesterRegistrationID, status);

            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },
    promoteStudents: async (req, res) => {
        try {

            // BacthID, SectionID, CampusID, DepartmentID, SessionID,
            const { BatchID, SectionID, CampusID, DepartmentID, SessionID } = req.body;

            const studentData = await studentModel.getSpecificStudents(BatchID, SectionID, CampusID, DepartmentID);

            // Get active status ID from statuses table
            const activeStatus = await statusModel.getStatusByName("active");

            // Active status ID
            let activeStatusID = activeStatus[0].statusID;

            for (let i = 0; i < studentData.length; i++) {

                const studentID = studentData[i].StudentID;
                const semesterData = await semesterModel.getSemesterRegistrationByStudentID(studentID);


                if (semesterData.length === 0) {
                    await semesterModel.registerSemester(studentID, 1, SessionID, activeStatusID);
                    continue;

                }

                else if (semesterData[0].status === activeStatusID) {
                    await semesterModel.updateSemsterNoAndReg(semesterData[0].SemesterRegistrationID, semesterData[0].SemesterNumber + 1, SessionID);
                }

            } ;
            res.json(config.responseGenerator(false, [], "All students have been promoted to the next semester."));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    }
};

module.exports = semesterController;
