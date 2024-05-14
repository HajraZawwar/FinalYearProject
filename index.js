const express = require('express');
const app = express();
const config = require('./constants/config.js');
const auth = require('./middleware/auth.middleware.js');
const authRoute = require('./routes/auth.route.js');
const courseRoute = require('./routes/course.route.js');
const studentRoute = require('./routes/student.route.js');
const deptRoute = require('./routes/department.route.js');
const campusRoute = require('./routes/campus.route.js');
const sectionRoute = require('./routes/section.route.js');
const batchRoute = require('./routes/batch.route.js');
const gradeRoute = require('./routes/grade.route.js');
const sessionRoute = require('./routes/session.route.js');
const roleRoute = require('./routes/roles.routes.js');
const adminRoute = require('./routes/admin.routes.js');



// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("This is the homepage");
});

//This is for login signup and other things
app.use('/auth', authRoute);

// Admin accessing all the courses
app.use('/course',courseRoute)

// Admin accessing all the students
app.use('/student',studentRoute)

// Admin accessing all the departments
app.use('/department',deptRoute)

// Admin accessing all the campuses
app.use('/campus',campusRoute)

// Admin accessing all the batches
app.use('/batch',batchRoute)

// Admin accessing all the sections
app.use('/section',sectionRoute)

// Admin accessing all the grades
app.use('/grade',gradeRoute)

// Admin accessing all the sessions
app.use('/session',sessionRoute)

app.use('/role', roleRoute)

app.use('/admin', adminRoute);


app.listen(config.expressPort, () => {
    console.log("Server is running on port " + config.expressPort);
});