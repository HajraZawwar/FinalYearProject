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
    updateCourse: 'UPDATE course SET CourseName = ?, CourseCode = ?, CreditHours = ? WHERE CourseID = ?',
    deleteCourse: 'DELETE FROM course WHERE CourseID = ?',
};

const gradeSQl = {
    selectAll: 'SELECT * FROM grades',
    addGrade: 'INSERT INTO grades (SessionID, GradeName, MinPercentage, MaxPercentage) VALUES (?, ?, ?, ?)',
    updateGrade: 'UPDATE grades SET SessionID = ?, GradeName = ?, MinPercentage = ?, MaxPercentage = ? WHERE GradeID = ?',
    deleteGrade: 'DELETE FROM grades WHERE GradeID = ?',
};

const roleSQl = {
    selectAll: 'SELECT * FROM roles',
    selectRoleById: 'SELECT * FROM roles WHERE roleId = ?',
    addRole: 'INSERT INTO roles (role) VALUES (?)',
    updateRole: 'UPDATE roles SET role = ? WHERE roleId = ?',
    deleteRole: 'DELETE FROM roles WHERE roleId = ?',
};

const departmentSQl = {
    selectAll: 'SELECT * FROM department',
    addDepartment: 'INSERT INTO department (DepartmentName) VALUES (?)',
    updateDepartment: 'UPDATE department SET DepartmentName = ? WHERE DepartmentID = ?',
    deleteDepartment: 'DELETE FROM department WHERE DepartmentID = ?',
};

const batchSQl = {
    selectAll: 'SELECT * FROM batch',
    addBatch: 'INSERT INTO batch (BatchName) VALUES (?)',
    findBatchById: 'SELECT * FROM batch WHERE BatchID = ?',
    updateBatch: 'UPDATE batch SET BatchName = ? WHERE BatchID = ?',
    deleteBatch: 'DELETE FROM batch WHERE BatchID = ?',
};

const studentSQl = {
    selectAll: 'SELECT * FROM students',
    addStudent: 'INSERT INTO students (RollNo, FirstName, LastName, Age, Gender, City, Country, PhoneNo, Address, BatchID, CampusID, SectionID, DepartmentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    findStudentById: 'SELECT * FROM students WHERE StudentID = ?',
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

module.exports = { loginSQl, courseSQl, gradeSQl, roleSQl, departmentSQl, batchSQl, studentSQl, transcriptSQl};
