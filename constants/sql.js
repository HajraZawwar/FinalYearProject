const loginSQl ={
    selectAll: 'SELECT * FROM login',
    selectLogin: 'SELECT * FROM login WHERE username = ? AND password = ?',
    selectUserByUsername: 'SELECT * FROM login WHERE username = ?',
    insertUser: 'INSERT INTO login (username, password, role) VALUES (?, ?, ?)',
}

const courseSQl ={
    selectAll: `SELECT * FROM course`
}


const courseQueries = {
    selectAll: 
        `SELECT * FROM Courses`,
    addCourse: 
        `INSERT INTO Courses (course_name, course_description, course_credit)
        VALUES (?, ?, ?)`,
    findCourseById: 
    ` SELECT * FROM Courses
        WHERE course_id = ?`,
    updateCourse: 
    `UPDATE Courses
     SET course_name = ?, course_description = ?, course_credit = ?
        WHERE course_id = ?`,
    deleteCourse: 
    `DELETE FROM Courses WHERE course_id = ?`
};

const gradeQueries = {
    selectAll: 
        `SELECT * FROM Grades`,
    addGrade: 
        `INSERT INTO Grades (student_id, course_id, grade)
        VALUES (?, ?, ?)`,
    updateGrade: 
    `UPDATE Grades
     SET student_id = ?, course_id = ?, grade = ?
        WHERE grade_id = ?`,
    deleteGrade: 
    `DELETE FROM Grades WHERE grade_id = ?`
};

module.exports = gradeQueries;


module.exports = {loginSQl, courseQueries};
