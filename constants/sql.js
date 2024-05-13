// Used for storing all the SQL queries in one place to avoid redundancy and make it easier to manage

const loginSQl = {
    selectAll: 'SELECT * FROM login',
    selectLogin: 'SELECT * FROM login WHERE username = ? AND password = ?',
    selectUserByUsername: 'SELECT * FROM login WHERE username = ?',
    insertUser: 'INSERT INTO login (username, password, role) VALUES (?, ?, ?)',
}

const courseSQl = {
    selectAll: 'SELECT * FROM course',
    addCourse: 'INSERT INTO course (CourseName, CourseCode, CreditHours) VALUES (?, ?, ?)',
    findCourseById: 'SELECT * FROM course WHERE CourseID = ?',
    findCourseByCode: 'SELECT * FROM course WHERE CourseCode = ?',
    updateCourse: 'UPDATE course SET CourseName = ?, CourseCode = ?, CreditHours = ? WHERE CourseID = ?',
    deleteCourse: 'DELETE FROM course WHERE CourseID = ?',
};

const gradeSQl = {
    selectAll: 'SELECT * FROM grades',
    addGrade: 'INSERT INTO grades (SessionID, GradeName, MinPercentage, MaxPercentage) VALUES (?, ?, ?, ?)',
    updateGrade: 'UPDATE grades SET SessionID = ?, GradeName = ?, MinPercentage = ?, MaxPercentage = ? WHERE GradeID = ?',
    getGradeByName: 'SELECT * FROM grades WHERE GradeName = ?',
    deleteGrade: 'DELETE FROM grades WHERE GradeID = ?',
};

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

const studentSQl = {
    selectAll: 'SELECT * FROM students',
    addStudent: 'INSERT INTO students (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    findStudentById: 'SELECT * FROM students WHERE StudentID = ?',
    findStudentByRollNo: 'SELECT * FROM students WHERE RollNo = ?',
    findStudentByRollNo: 'SELECT * FROM students WHERE RollNo = ?',
    findStudentByNames: 'SELECT * FROM students WHERE FirstName = ? AND LastName = ?',
    findStudentByBatch: 'SELECT * FROM students WHERE BatchID = ?',
    findStudentByCampus: 'SELECT * FROM students WHERE CampusID = ?',
    findStudentBySection: 'SELECT * FROM students WHERE SectionID = ?',
    findStudentByDepartment: 'SELECT * FROM students WHERE DepartmentID = ?',
    findStudentByStatus: 'SELECT * FROM students WHERE status = ?',
    updateStudent: 'UPDATE students SET RollNo = ?, FirstName = ?, LastName = ?, Age = ?, Gender = ?, City = ?, Country = ?, PhoneNo = ?, Address = ?, BatchID = ?, CampusID = ?, SectionID = ?, DepartmentID = ? WHERE StudentID = ?',
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
    selectAll: 'SELECT * FROM teachers',
    addTeacher: 'INSERT INTO teachers (TeacherCode, FirstName, LastName, Age, Gender, PhoneNo, Email, DepartmentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    findTeacherById: 'SELECT * FROM teachers WHERE TeacherID = ?',
    updateTeacher: 'UPDATE teachers SET TeacherCode = ?, FirstName = ?, LastName = ?, Age = ?, Gender = ?, PhoneNo = ?, Email = ?, DepartmentID = ? WHERE TeacherID = ?',
    deleteTeacher: 'DELETE FROM teachers WHERE TeacherID = ?',
};

module.exports = { loginSQl, courseSQl, gradeSQl, roleSQl, departmentSQl, batchSQl, studentSQl, transcriptSQl, campusSQl, roadmapSQl, sectionSQl, sessionSQl, teacherSQl };
