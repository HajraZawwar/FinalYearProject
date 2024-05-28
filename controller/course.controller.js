// Description: All the functions related to courses are defined here.
const config = require('./../constants/config.js');
const courseModel = require('../models/course.model.js');
const semesterModel = require('../models/semester.model.js');
const gradeModel = require('../models/grades.model.js');

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

    addFinalMarks: async (req, res) => {
        try {
            const CourseRegID = req.body.CourseRegID;
            const FinalMarks = req.body.FinalMarks;



            const MidsAndFinalData = await courseModel.getMidsAndFinalsByCourseRegID(CourseRegID);

            if (MidsAndFinalData[0].FinalPercentage < FinalMarks) {
                res.status(500).json(config.responseGenerator(true, null, "Obtained Final Marks cannot be greater than total Final marks"));
                return;
            }

            const result = await courseModel.addFinalMarks(FinalMarks, CourseRegID);

            if (result.affectedRows == 0) {
                res.status(500).json(config.responseGenerator(true, null, "No such course registration exists"));
                return;
            }

            res.json(config.responseGenerator(false, "Final Marks Added Successfully", ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }

    },


    getStudentGradebookByCourseRegId: async (req, res) => {
        try {
            const CourseRegID = req.query.CourseRegID;
            const sessionalData = await courseModel.getSessionalByCourseRegID(CourseRegID);

            const MidsFinalsData = await courseModel.getMidsAndFinalsByCourseRegID(CourseRegID);


            // console.log( MidsFinalsData);
            let MidsMarks, FinalsMarks, sessionalMarks, totalMarks = 0;

            if (MidsFinalsData[0].MidObtainedMarks == null)
                MidsMarks = 0;
            else
                MidsMarks = (MidsFinalsData[0].MidObtainedMarks / MidsFinalsData[0].MidPercentage) * 35;

            if (MidsFinalsData[0].FinalObtainedMarks == null)
                FinalsMarks = 0;
            else
                FinalsMarks = (MidsFinalsData[0].FinalObtainedMarks / MidsFinalsData[0].FinalPercentage) * 40;

            if (MidsFinalsData[0].SessionalPercentage == null)
                sessionalMarks = 0;
            else
                sessionalMarks = MidsFinalsData[0].SessionalPercentage;

            // console.log(typeof MidsMarks, typeof FinalsMarks, typeof sessionalMarks)


            totalMarks = Number(MidsMarks) + Number(FinalsMarks) + Number(sessionalMarks);

            const grade = await gradeModel.getGradeByMarks(totalMarks);

            const data = {
                sessionalData: sessionalData,
                MidsFinalsData: MidsFinalsData[0],
                totalMarks: totalMarks,
                grade: grade[0].GradeName
            }

            // console.log(data)
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    }
    ,

    updateFinalPercentage: async (req, res) => {
        try {
            const CourseOfferingID = req.body.CoursOfferingID;
            const FinalPercentage = req.body.FinalPercentage;
            const CourseRegIDs = await courseModel.getCourseRegIdByCourseOfferingId(CourseOfferingID);

            if (CourseRegIDs.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is not registered"));
                return;
            }

            for (let i = 0; i < CourseRegIDs.length; i++) {
                const courseRegId = CourseRegIDs[i].CourseRegistrationID;
                await courseModel.updateFinalPercentage(FinalPercentage, courseRegId);
            }

            res.json(config.responseGenerator(false, "done Successfully", ""));

        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },



    updateMidsPercentage: async (req, res) => {
        try {
            const CourseRegID = req.body.CoursOfferingID;
            const MidPercentage = req.body.MidPercentage;
            const CoursRegIDs = await courseModel.getCourseRegIdByCourseOfferingId(CourseRegID);

            if (CoursRegIDs.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is not registered"));
                return;
            }

            console.log(CoursRegIDs);
            // res.json(config.responseGenerator(false,CoursRegIDs, ""));

            for (let i = 0; i < CoursRegIDs.length; i++) {
                const courseRegId = CoursRegIDs[i].CourseRegistrationID;
                await courseModel.updateMidsPercentage(MidPercentage, courseRegId);
            }

            res.json(config.responseGenerator(false, "done Successfully", ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    // CourseRegistrationID, SemesterRegistrationID, MidPercentage, FinalPercentage, SessionalPercentage, CourseOfferingID
    registerCourse: async (req, res) => {
        try {
            const studentID = req.body.StudentID;
            const CourseOfferingID = req.body.CourseOfferingID;
            const MidPercentage = req.body.MidPercentage;
            const FinalPercentage = req.body.FinalPercentage;
            const SessionalPercentage = req.body.SessionalPercentage;

            const SemesterReg = await semesterModel.getSemesterRegistrationByStudentID(studentID);

            if (SemesterReg.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Student is not registered in any semester"));
                return;
            }

            // getting the semester reegistration id
            const SemesterRegistrationID = SemesterReg[0].SemesterRegistrationID;

            //get the courseRegId if it exists or not
            const isCourseReg = await courseModel.getCourseRegistrationIDBySemAndCourse(SemesterRegistrationID, CourseOfferingID);


            if (isCourseReg.length > 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is already registered"));
                return;
            }

            const result = await courseModel.registerCourse(SemesterRegistrationID, CourseOfferingID, MidPercentage, FinalPercentage, SessionalPercentage);
            res.json(config.responseGenerator(false, result, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    submitGradeBook: async (req, res) => {
        try {

            const courseOfferingID = req.body.CourseOfferingID;
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    addMidsMarks: async (req, res) => {
        try {
            const CourseRegID = req.body.CourseRegID;
            const MidMarks = req.body.MidMarks;

            const result = await courseModel.addMidsMarks(MidMarks, CourseRegID);

            const MidsAndFinalData = await courseModel.getMidsAndFinalsByCourseRegID(CourseRegID);

            if (MidsAndFinalData[0].MidPercentage < MidMarks) {
                res.status(500).json(config.responseGenerator(true, null, "Obtained Mid Marks cannot be greater than total Mids marks"));
                return;
            }

            if (result.affectedRows == 0) {
                res.status(500).json(config.responseGenerator(true, null, "No such course registration exists"));
                return;
            }

            res.json(config.responseGenerator(false, "Mid Marks Added Successfully", ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    addSessionalMarks: async (req, res) => {

        try {
            const CourseRegID = req.body.CourseRegID;
            const SessionalName = req.body.SessionalName;

            const sessional = await courseModel.getSessionalByName(SessionalName, CourseRegID);

            if (sessional.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Sessional does not exist"));
                return;
            }

            const SessionalID = sessional[0].SessionalID;
            const ObtainedMarks = req.body.ObtainedMarks;

            if (ObtainedMarks > sessional[0].TotalMarks) {
                res.status(500).json(config.responseGenerator(true, null, "Obtained marks cannot be greater than total marks"));
                return;
            }

            const result = await courseModel.addSessionalMarks(ObtainedMarks, SessionalID);

            const allSessionals = await courseModel.getSessionalsListByCourseOffering(CourseRegID);



            if (result.affectedRows == 0) {
                res.status(500).json(config.responseGenerator(true, null, "No such sessional exists for this course registration"));
                return;
            }


            let totalSessionalMarks = 0;

            console.log(allSessionals)

            for (let i = 0; i < allSessionals.length; i++) {
                totalSessionalMarks += allSessionals[i].Weightage * allSessionals[i].ObtainedMarks / allSessionals[i].TotalMarks;
            }

            const SolidSessionalMarks = totalSessionalMarks * 0.25;

            console.log("SolidSessionalMarks : ", SolidSessionalMarks);

            await courseModel.updateSessionalPercentage(SolidSessionalMarks, CourseRegID);

            res.json(config.responseGenerator(false, `Sessional Marks Addded Succuesfully`, ""));

        }
        catch (error) {
            // console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },
    getDetailsOfStudentsInARegCourse: async (req, res) => {
        try {
            const CourseOfferingID = req.query.CourseOfferingID;
            const data = await courseModel.getDetailsOfStudentsInARegCourse(CourseOfferingID);
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getAllRegisteredCourses: async (req, res) => {
        try {
            const data = await courseModel.getAllRegisteredCourses();
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    getAllOfferedCourses: async (req, res) => {
        try {
            const data = await courseModel.getAllOfferedCourses();
            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
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

    },

    offerCourse: async (req, res) => {
        try {
            //courseOfferingID (auto increment), department, session, batch, section, campus, course, teacherID
            const DeptID = req.body.DepartmentID;
            const SessionID = req.body.SessionID;
            const BatchID = req.body.BatchID;
            const SectionID = req.body.SectionID;
            const CampusID = req.body.CampusID;
            const CourseID = req.body.CourseID;
            const teacherID = req.body.teacherID;

            const result = await courseModel.offerCourse(DeptID, SessionID, BatchID, SectionID, CampusID, CourseID, teacherID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },
    // SessionalID, CourseRegistrationID, SessionalName, ObtainedMarks, TotalMarks, Weightage
    addSessionalActivity: async function (req, res) {
        try {
            const courseOfferingID = req.body.CourseOfferingID;
            const studentID = req.body.StudentID;
            const sessionalName = req.body.SessionalName;
            const totalMarks = req.body.TotalMarks;
            const weightage = req.body.Weightage;

            const courseRegIds = await courseModel.getCourseRegIdByCourseOfferingId(courseOfferingID);

            const sessionalList = await courseModel.getSessionalsListByCourseOffering(courseOfferingID);

            // check if the sessional already exists
            let sum = 0;
            for (let i = 0; i < sessionalList.length; i++) {
                if (sessionalList[i].SessionalName == sessionalName) {
                    res.status(500).json(config.responseGenerator(true, null, "Sessional already exists"));
                    return;
                }

                sum += sessionalList[i].Weightage;
            }
            // If total weigtage exceeds 100

            if (sum + weightage > 100) {
                res.status(500).json(config.responseGenerator(true, null, "Total weightage exceeds 100"));
                return;
            }

            if (courseRegIds.length == 0) {
                res.status(500).json(config.responseGenerator(true, null, "Course is not registered"));
                return;
            }

            for (let i = 0; i < courseRegIds.length; i++) {
                const courseRegId = courseRegIds[i].CourseRegistrationID;
                const sessional = await courseModel.getSessionalByName(sessionalName, courseRegId);

                // check if the sessional already exists
                if (sessional.length > 0) {
                    res.status(500).json(config.responseGenerator(true, null, "Sessional already exists"));
                    return;
                }

                // adding the sessional activity
                await courseModel.addSectionalActivity(courseRegId, sessionalName, 0, totalMarks, weightage);
            };


            res.json(config.responseGenerator(false, "Sessional Added Succesfully", ""));

        } catch (error) {
            console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    },

    getAllSessionalsByCourseOffering: async function (req, res) {
        try {
            const courseOfferingID = req.query.CourseOfferingID;
            const data = await courseModel.getSessionalsListByCourseOffering(courseOfferingID);
            res.json(config.responseGenerator(false, data, ""));
        } catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }
    }

};

module.exports = courseController;
