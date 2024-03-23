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
    deleteCourse: `DELETE FROM Courses WHERE course_id = ?`
};

module.exports = {loginSQl, courseQueries};
