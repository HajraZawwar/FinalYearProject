// Used for storing all the SQL queries in one place to avoid redundancy and make it easier to manage

const loginSQl = {
    selectAll: 'SELECT * FROM login',
    selectLogin: 'SELECT * FROM login WHERE username = ?',
    selectUserByUsername: 'SELECT * FROM login WHERE username = ?',
    insertUser: 'INSERT INTO login (username, password, role) VALUES (?, ?, ?)',
}

const adminSQl = {

}

const courseSQl = {
    selectAll: 'SELECT * FROM course',
    addCourse: 'INSERT INTO course (CourseName, CourseCode, CreditHours) VALUES (?, ?, ?)',
    findCourseById: 'SELECT * FROM course WHERE CourseID = ?',
    findCourseByCode: 'SELECT * FROM course WHERE CourseCode = ?',
    selectAllOferedCourses: 'SELECT * FROM courseoffering join course on courseoffering.course = course.CourseID join department on courseoffering.department = department.DepartmentID join session on courseoffering.session = session.SessionID join batch on courseoffering.batch = batch.BatchID join section on courseoffering.section = section.SectionID join campus on courseoffering.campus = campus.CampusID',
    updateCourse: 'UPDATE course SET CourseName = ?, CourseCode = ?, CreditHours = ? WHERE CourseID = ?',
    deleteCourse: 'DELETE FROM course WHERE CourseID = ?',
    offerCourse: 'INSERT INTO courseoffering (department, session, batch, section, campus, course,teacherID) VALUES (?, ?, ?, ?, ?, ?, ?)',
    addSessionnal: 'INSERT INTO coursesessionalstable (CourseRegistrationID, SessionalName, ObtainedMarks, TotalMarks, Weightage) VALUES (?, ?, ?, ?, ?)',
    updtaeWeightage: 'UPDATE coursesessionalstable SET Weightage = ? WHERE CourseRegistrationID = ? AND SessionalName = ?',
    updateTotalMarks: 'UPDATE coursesessionalstable SET TotalMarks = ? WHERE CourseRegistrationID = ? AND SessionalName = ?',
    updateCourseSessionalObtainedMarks: 'UPDATE coursesessionalstable SET ObtainedMarks = ? WHERE CourseRegistrationID = ? AND SessionalName = ?',
    registerCourse: 'INSERT INTO courseregistration (SemesterRegistrationID, CourseOfferingID, MidPercentage, FinalPercentage, SessionalPercentage) VALUES (?, ?, ?, ?, ?)',
    // CourseRegistrationID, SemesterRegistrationID, MidPercentage, FinalPercentage, SessionalPercentage, CourseOfferingID
    getAllRegisteredCourses: 'SELECT * FROM courseregistration join semesterregistration on courseregistration.SemesterRegistrationID = semesterregistration.SemesterRegistrationID join courseoffering on courseregistration.CourseOfferingID = courseoffering.CourseOfferingID',
    getCourseRegistrationIDBySemAndCourse: 'SELECT * FROM courseregistration WHERE SemesterRegistrationID = ? AND CourseOfferingID = ?',
    // getCourseOfferingByTeacherAndCourse: `select CourseRegistrationID from courseregistration as cr 
    // join semesterregistration as sr on sr.SemesterRegistrationID = cr.SemesterRegistrationID
    // join students as s on sr.StudentID = s.StudentID
    // join  courseoffering as cf on cf.courseOfferingID = cr.courseOfferingID
    // and cf.TeacherID = ?
    // and cf.course= ?`,
    getCourseRegIDByCourseOffering: 'SELECT * FROM courseregistration WHERE CourseOfferingID = ?',
    getSessionalByName: 'SELECT * FROM coursesessionalstable WHERE SessionalName = ? AND CourseRegistrationID = ?',
    getAllSessionalsByCourseOffering: `select cs.SessionalName, cs.Weightage, cs.TotalMarks
    from coursesessionalstable as cs 
    join courseregistration as cr
    on cr.CourseRegistrationID = cs.CourseRegistrationID
    where cr.CourseOfferingID = ?
    group by SessionalName, cs.Weightage, cs.TotalMarks`,
    getCourseRegIDofStudentsInACourse: `select distinct (st.StudentID), st.RollNo,st.FirstName, st.LastName, cr.CourseRegistrationID, cr.CourseOfferingID
    from coursesessionalstable as cs 
    join courseregistration as cr
    on cr.CourseRegistrationID = cs.CourseRegistrationID
    join semesterregistration as sr on sr.SemesterRegistrationID = cr.SemesterRegistrationID
    join students as st on st.StudentID = sr.StudentID
    where cr.CourseOfferingID = ?`,
    addSessionalMarks: 'UPDATE coursesessionalstable SET ObtainedMarks = ? WHERE  SessionalID = ?',
    getSessionalByCourseRegID: 'SELECT * FROM coursesessionalstable WHERE CourseRegistrationID = ?',
    updateSessionalPercentage: 'UPDATE courseregistration SET SessionalPercentage = ? WHERE CourseRegistrationID = ?',
    updateMidPercentage: 'UPDATE courseregistration SET MidPercentage = ? WHERE CourseRegistrationID = ?',
    updateFinalPercentage: 'UPDATE courseregistration SET FinalPercentage = ? WHERE CourseRegistrationID = ?',
    getMidsAndFinalsMarks: `SELECT * from courseregistration as cr where cr.courseregistrationID = ?`,
    addMidsMarks: 'UPDATE courseregistration SET MidObtainedMarks = ? WHERE CourseRegistrationID = ?',
    addFinalMarks: 'UPDATE courseregistration SET FinalObtainedMarks = ? WHERE CourseRegistrationID = ?',
};

const gradeSQl = {
    selectAll: 'SELECT * FROM grades',
    addGrade: 'INSERT INTO grades (SessionID, GradeName, MinPercentage, MaxPercentage) VALUES (?, ?, ?, ?)',
    updateGrade: 'UPDATE grades SET SessionID = ?, GradeName = ?, MinPercentage = ?, MaxPercentage = ? WHERE GradeID = ?',
    getGradeByName: 'SELECT * FROM grades WHERE GradeName = ?',
    deleteGrade: 'DELETE FROM grades WHERE GradeID = ?',
    getGradeByMarks: `SELECT GradeName
    FROM Grades
    WHERE ? BETWEEN MinPercentage AND MaxPercentage;`
};

const semesterSQl = {
    selectAllsemesterRegistrations: 'SELECT * FROM semesterregistration join students on semesterregistration.StudentID = students.StudentID join session on semesterregistration.SessionID = session.SessionID',
    updateSemesterNoAndSession: 'UPDATE semesterregistration SET SemesterNumber = ?, SessionID = ? WHERE SemesterRegistrationID = ?',
    getSemRegByStudentID: 'SELECT * FROM semesterregistration WHERE StudentID = ?',
    registerSemester: 'INSERT INTO semesterregistration (StudentID, SemesterNumber, SessionID, status) VALUES (?, ?, ?, ?)',
}

const roleSQl = {
    selectAll: 'SELECT * FROM roles',
    selectRoleById: 'SELECT * FROM roles WHERE roleId = ?',
    selectRoleByName: `SELECT * from roles
    WHERE role =? `,
    addRole: 'INSERT INTO roles (role) VALUES (?)',
    updateRole: 'UPDATE roles SET role = ? WHERE roleId = ?',
    deleteRole: 'DELETE FROM roles WHERE roleId = ?',
};

const departmentSQl = {
    selectAll: 'SELECT * FROM department',
    addDepartment: 'INSERT INTO department (DepartmentName) VALUES (?)',
    updateDepartment: 'UPDATE department SET DepartmentName = ? WHERE DepartmentID = ?',
    deleteDepartment: 'DELETE FROM department WHERE DepartmentID = ?',
    getDepartmentById: 'SELECT * FROM department WHERE DepartmentID = ?',
};

const batchSQl = {
    selectAll: 'SELECT * FROM batch',
    addBatch: 'INSERT INTO batch (BatchName) VALUES (?)',
    findBatchById: 'SELECT * FROM batch WHERE BatchID = ?',
    findBatchByName: 'SELECT * FROM batch WHERE BatchName = ?',
    updateBatch: 'UPDATE batch SET BatchName = ? WHERE BatchID = ?',
    deleteBatch: 'DELETE FROM batch WHERE BatchID = ?',
};

const statusSQl = {
    selectAll: 'SELECT * FROM statuses',
    addStatus: 'INSERT INTO statuses (status) VALUES (?)',
    findStatusById: 'SELECT * FROM statuses WHERE statusID = ?',
    findStatusByName: 'SELECT * FROM statuses WHERE statusName = ?',
};

const studentSQl = {
    selectAll: 'SELECT * FROM students join batch on students.BatchID = batch.BatchID join campus on students.CampusID = campus.CampusID join section on students.SectionID = section.SectionID join department on students.DepartmentID = department.DepartmentID',
    addStudent: 'INSERT INTO students (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updateStudentLogin: 'UPDATE students SET login = ? WHERE StudentID = ?',
    getStudentByLoginId: 'SELECT * FROM students WHERE login = ?',
    selectSpecificStudents: 'SELECT * FROM students WHERE BatchID = ? AND SectionID = ? AND CampusID = ? AND DepartmentID = ?',
    findBySectionAndBatchAndDegreeAndCampus: 'SELECT * FROM students WHERE SectionID = ? AND BatchID = ? AND DepartmentID = ? AND CampusID = ?',
    findWhereLoginIsNull: 'SELECT * FROM students WHERE login IS NULL',
    findStudentById: 'SELECT * FROM students WHERE StudentID = ?',
    findStudentByRollNo: 'SELECT * FROM students WHERE RollNo = ?',
    findStudentByNames: 'SELECT * FROM students WHERE FirstName = ? AND LastName = ?',
    findStudentByBatch: 'SELECT * FROM students WHERE BatchID = ?',
    findStudentByCampus: 'SELECT * FROM students WHERE CampusID = ?',
    findStudentBySection: 'SELECT * FROM students WHERE SectionID = ?',
    findStudentByDepartment: 'SELECT * FROM students WHERE DepartmentID = ?',
    findStudentByStatus: 'SELECT * FROM students WHERE status = ?',
    updateStudent: 'UPDATE students SET RollNo = ?, FirstName = ?, LastName = ?, Age = ?, Gender = ?, City = ?, Country = ?, PhoneNo = ?, Address = ?, BatchID = ?, CampusID = ?, SectionID = ?, DepartmentID = ?, status = ? WHERE StudentID = ?',
    deleteStudent: 'DELETE FROM students WHERE StudentID = ?',
};

const transcriptSQl = {
    selectAll: 'SELECT * FROM transcript',
    addTranscript: 'INSERT INTO transcript (StudentID, SemesterNumber, CourseID, CourseGrade, SemesterGrade) VALUES (?, ?, ?, ?, ?)',
    findTranscriptById: 'SELECT * FROM transcript WHERE TranscriptID = ?',
    updateTranscript: 'UPDATE transcript SET StudentID = ?, SemesterNumber = ?, CourseID = ?, CourseGrade = ?, SemesterGrade = ? WHERE TranscriptID = ?',
    deleteTranscript: 'DELETE FROM transcript WHERE TranscriptID = ?',
};

const campusSQl = {
    selectAll: 'SELECT * FROM campus',
    addCampus: 'INSERT INTO campus (CampusName) VALUES (?)',
    findCampusById: 'SELECT * FROM campus WHERE CampusID = ?',
    updateCampus: 'UPDATE campus SET CampusName = ? WHERE CampusID = ?',
    deleteCampus: 'DELETE FROM campus WHERE CampusID = ?',
};

const roadmapSQl = {
    selectAll: 'SELECT * FROM roadmap',
    ifRoadMapExist: 'SELECT * FROM roadmap WHERE CourseID = ? AND Pre_req_ID = ?',
    addRoadmap: 'INSERT INTO roadmap (CourseID, Pre_req_ID) VALUES (?, ?)',
    findRoadmapById: 'SELECT * FROM roadmap WHERE idroadmap = ?',
    getRoadmapByCourseID: 'SELECT * FROM roadmap WHERE CourseID = ?',
    getRoadmapByPreReqID: 'SELECT * FROM roadmap WHERE Pre_req_ID = ?',
    updateRoadmap: 'UPDATE roadmap SET CourseID = ?, Pre_req_ID = ? WHERE idroadmap = ?',
    deleteRoadmap: 'DELETE FROM roadmap WHERE idroadmap = ?',
};

const sectionSQl = {
    selectAll: 'SELECT * FROM section',
    addSection: 'INSERT INTO section (SectionName) VALUES (?)',
    findSectionById: 'SELECT * FROM section WHERE SectionID = ?',
    updateSection: 'UPDATE section SET SectionName = ? WHERE SectionID = ?',
    deleteSection: 'DELETE FROM section WHERE SectionID = ?',
};

const sessionSQl = {
    selectAll: 'SELECT * FROM session',
    addSession: 'INSERT INTO session (SessionName, StartDate, EndDate) VALUES (?, ?, ?)',
    getSessionByName: 'SELECT * FROM session WHERE SessionName = ?',
    findSessionById: 'SELECT * FROM session WHERE SessionID = ?',
    updateSession: 'UPDATE session SET SessionName = ?, StartDate = ?, EndDate = ? WHERE SessionID = ?',
    deleteSession: 'DELETE FROM session WHERE SessionID = ?',
};

const teacherSQl = {
    nullLogin: `SELECT  * FROM TEACHER WHERE login is NULL`,
    selectAll: 'SELECT * FROM teachers join department on teachers.DepartmentID = department.DepartmentID',
    addTeacher: 'INSERT INTO teachers (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    getTeacherByLoginId: 'SELECT * FROM teachers WHERE login = ?',
    updateLogin: 'UPDATE teachers SET login = ? WHERE TeacherID = ?',
    findTeacherById: 'SELECT * FROM teachers WHERE TeacherID = ?',
    updateTeacher: 'UPDATE teachers SET TeacherCode = ?, FirstName = ?, LastName = ?, Age = ?, Gender = ?, PhoneNo = ?, Email = ?, DepartmentID = ? WHERE TeacherID = ?',
    getSuperVisorByDept: 'SELECT * FROM teachers WHERE DepartmentID = ?',
    getAllSupervisors: 'SELECT * FROM supervisor',
    getSupervisorByID: 'SELECT * FROM supervisor WHERE TeacherID = ?',
    addSupervisor: 'INSERT INTO supervisor (TeacherID, DepartmentID) VALUES (?, ?)',
    editSupervisor: 'UPDATE supervisor SET DepartmentID = ? WHERE TeacherID = ?',

    deleteTeacher: 'DELETE FROM teachers WHERE TeacherID = ?',
};

module.exports = { loginSQl, courseSQl, gradeSQl, roleSQl, departmentSQl, batchSQl, studentSQl, transcriptSQl, campusSQl, roadmapSQl, sectionSQl, sessionSQl, teacherSQl, adminSQl, semesterSQl, statusSQl };
