
// All the imports will be done here
const db = require('./../constants/db.js');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../constants/config.js');
const loginSQl = require('../constants/sql.js');
const loginModel = require('../models/login.model.js');


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
                res.json(config.responseGenerator(false, rows, "Login Success"));
            } else {
                res.json(config.responseGenerator(true, null, "Login Failed"));
            }
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error));
        }
    }

    // Register: async (req, res) => {

    //Verify over here 
    // abhi jwt tokens use nahi kiye hain
    // JWT tokens can be used to verify the user

    // verify the jwt token
    // if the token is verified then the user is verified
    // if the token is not verified then the user is not verified

    // This will be used to register the user
    // register()




    // verify()




    // Role based logins can be implemented here

    // isAdmin()




    // isStudent()



    // isTeacher()



}

module.exports = authMiddleware;



