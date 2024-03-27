
// All the imports will be done here
const db = require('./../constants/db.js');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../constants/config.js');
const loginModel = require('../models/login.model.js');
const roleModel = require('../models/role.model.js');
const sql = require('../constants/sql.js');

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

            const rows = await loginModel.getLogin(username, password);

            if (rows.length > 0) {
                user = rows[0];
                const token = jwt.sign({ username: user.username, role: user.role }, config.JWT_SECRET);
                res.json(config.responseGenerator(false, { token, user }, "Login Success"));
            } else {
                res.json(config.responseGenerator(true, null, "Login Failed"));
            }
        } catch (error) {
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

                // Hash the password before storing it
                const hashedPassword = await bycrypt.hash(password, 10);

                // Register the new user
                const userId = await loginModel.registerUser(username, hashedPassword, role);

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
            res.json(config.responseGenerator(true, "error", error.message));
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