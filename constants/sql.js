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

const departmentQueries = {
    selectAll: 
        `SELECT * FROM Departments`,
    addDepartment: 
        `INSERT INTO Departments (department_name, department_id)
        VALUES (?, ?)`,
    updateDepartment: 
        `UPDATE Departments
        SET department_name = ?
        WHERE department_id = ?`,
    deleteDepartment: 
        `DELETE FROM Departments WHERE department_id = ?`
};

const batchQueries = {
    selectAll: 
        `SELECT * FROM Batches`,
    addBatch: 
        `INSERT INTO Batches (batch_name, start_date, end_date)
        VALUES (?, ?, ?)`,
    findBatchById: 
        `SELECT * FROM Batches
        WHERE batch_id = ?`,
    updateBatch: 
        `UPDATE Batches
        SET batch_name = ?, start_date = ?, end_date = ?
        WHERE batch_id = ?`,
    deleteBatch: 
        `DELETE FROM Batches WHERE batch_id = ?`
};


module.exports = {loginSQl, courseQueries , gradeQueries, departmentQueries, batchQuerie };
