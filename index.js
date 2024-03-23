const express = require('express');
const app = express();
const config = require('./constants/config.js');
const auth = require('./middleware/auth.middleware.js');
const authRoute = require('./routes/auth.route.js');
const courseRoute = require('./routes/course.route.js');
const adminController = require('./controller/admin.controller.js');


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


app.listen(config.expressPort, () => {
    console.log("Server is running on port " + config.expressPort);
});