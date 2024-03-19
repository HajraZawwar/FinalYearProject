const loginSQl ={
    selectAll: 'SELECT * FROM login',
    selectLogin: 'SELECT * FROM login WHERE username = ? AND password = ?',
}


const courseQueries = {
    addCourse: 
        `INSERT INTO Courses (course_name, course_description, course_credit)
        VALUES (?, ?, ?)`,
    findCourseById: 
    ` SELECT * FROM Courses
        WHERE course_id = ?`,
    updateCourse: 
    `UPDATE Courses
     SET course_name = ?, course_description = ?, course_credit = ?
        WHERE course_id = ?`
};

module.exports = {loginSQl, courseQueries};
