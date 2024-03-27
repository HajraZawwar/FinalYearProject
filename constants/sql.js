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
    selectRoleById: 'SELECT * FROM roles WHERE roleId = ?',
};

module.exports = { loginSQl, courseSQl, gradeSQl, roleSQl };
