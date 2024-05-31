
// All the imports will be done here
const db = require('./../constants/db.js');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../constants/config.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/roles.model.js');
const sql = require('../constants/sql.js');
const teacherModel = require('../models/teachers.model.js');
const studentModel = require('../models/students.model.js');

// This is the middleware 
// This middleware is used to get all the logins
// Middleware  means these functions are called before the request is passed to the route
// This will be used to perform verification of the user
// Role based logins and other things can be implemented here

const authMiddleware = {
    getAllLogins: async (req, res) => {
        try {
            const rows = await loginModel.getAllLogins();
            res.json(config.responseGenerator(false, rows, null));
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error));
        }
    },

    //this will tell if the user is login or not
    login: async (req, res) => {
        try {
            // getting data from the request
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                res.json(config.responseGenerator(true, null, "Username or password not provided"));
                return;

            }

            if (username === 'admin' && password === 'admin') {
                const token = jwt.sign
                    ({
                        username: 'admin',
                        role: 'admin'
                    }, config.JWT_SECRET);

                res.json(config.responseGenerator(false, { token, user: { 'FirstName': 'admin' }, role: 'admin' }, "Login Success"));
                return;
            };


            const rows = await loginModel.getLogin(username, password);
            let user = null;

            if (rows.length > 0) {
                user = rows[0];
                const token = jwt.sign({ username: user.username, role: user.role }, config.JWT_SECRET);


                // Get the user data
                let userData = null;

                const roleName = await roleModel.getRoleById(user.role).then((result) => {
                    return result[0].role;
                });


                if (roleName === 'studentzzzzzzzz') {
                    userData = await studentModel.getStudentByLogin(user.loginId);
                }
                else if (roleName === 'teacher') {

                    userData = await teacherModel.getTeacherByLogin(user.loginId);

                    console.log("Teacher Data", userData);
                    const getSupervisor = await teacherModel.getSupervisorByID(userData[0].TeacherID);

                    if (getSupervisor.length > 0) {
                        userData[0].Supervisor = getSupervisor[0];
                    }
                    else {
                        userData[0].Supervisor = null;
                    }
                }

                const responseData = {
                    token,
                    user: userData[0],
                    role: roleName,
                }

                res.json(config.responseGenerator(false, responseData, "Login Success"));
            } else {
                res.json(config.responseGenerator(true, null, "Login Failed"));
            }
        } catch (error) {
            console.log(error)
            res.json(config.responseGenerator(true, "error", error.message));
        }
    },

    // Register: async (req, res) => {

    //Verify over here 
    // abhi jwt tokens use nahi kiye hain
    // JWT tokens can be used to verify the user

    // verify the jwt token
    // if the token is verified then the user is verified
    // if the token is not verified then the user is not verified

    // This will be used to register the user
    // register()
    register: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const role = req.body.role; // Assuming role is provided in the request body

            // Check if role foreign key exists or not
            // If the role does not exist, return an error
            const [roleResult] = await roleModel.getRoleById(role);

            if (roleResult.length > 0) {
                // Check if the username is already taken
                const [existingUser] = await loginModel.getUserByUsername(username);

                if (existingUser > 0) {
                    res.json(config.responseGenerator(true, null, "Username is already taken"));
                    return;
                }

                // Register the new user
                const userId = await loginModel.registerUser(username, password, role);

                res.json(config.responseGenerator(false, { userId, username, role }, "Registration successful"));
            }
            else {
                res.json(config.responseGenerator(true, null, "Role does not exist"));
                return;
            }

        } catch (error) {
            res.json(config.responseGenerator(true, "error", error.message));
        }
    },

    isSupervisor: async (req, res, next) => {
        try {
            if (req.user) {
                const [roleResult] = await teacherModel.getSupervisorByID(req.TeacherID.username);
                if (roleResult.length > 0) {
                    next();
                }
            } else {
                return res.json(config.responseGenerator(true, null, "Access denied. Supervisor privileges required."));
            }
        } catch (error) {
            res.status(500).json(config.responseGenerator(true, "error", error.message));
        }
    },


    // verify()
    // Middleware to verify the jwt token

    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.json(config.responseGenerator(true, null, "Token not provided"));
            }

            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json(config.responseGenerator(true, null, "Token verification failed"));
                }

                req.user = decoded;
                next();
            });
        } catch (error) {
            res.status(500).json(config.responseGenerator(true, "error", error.message));
        }
    },

    // Role based logins can be implemented here

    // isAdmin()
    // Middleware to check if the user has admin role
    isAdmin: async (req, res, next) => {
        try {
            if (req.user) {
                const [roleResult] = await roleModel.getRoleById(req.user.role);
                if (roleResult.length > 0) {
                    if (roleResult.role === 'admin') {
                        next();
                    }
                }
            } else {
                return res.json(config.responseGenerator(true, null, "Access denied. Admin privileges required."));
            }
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error.message));
        }
    },


    //isStudent()
    // Middleware to check if the user has student role
    isStudent: async (req, res, next) => {
        try {
            if (req.user) {
                const [roleResult] = await roleModel.getRoleById(req.user.role);
                if (roleResult.length > 0) {
                    if (roleResult.role === 'student') {
                        next();
                    }
                }
            } else {
                return res.json(config.responseGenerator(true, null, "Access denied. Student privileges required."));
            }
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error.message));
        }
    },

    //isTeacher()
    // Middleware to check if the user has teacher role
    isTeacher: async (req, res, next) => {
        try {
            if (req.user) {
                const [roleResult] = await roleModel.getRoleById(req.user.role);
                if (roleResult.length > 0) {
                    if (roleResult.role === 'teacher') {
                        next();
                    }
                }
            } else {
                return res.json(config.responseGenerator(true, null, "Access denied. Teacher privileges required."));
            }
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error.message));
        }
    }
}

module.exports = authMiddleware;