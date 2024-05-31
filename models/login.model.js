const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');
const bycrypt = require('bcrypt');
const e = require('express');

const loginModel = {
    getAllLogins: async () => {
        try {

            // getting the data from the database
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectAll, null);

            return rows;

        } catch (error) {
            throw error;
        }
    },

    getLogin: async (username, password) => {
        try {

            //getting the data from the database
            // Exevcute the query
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectLogin, [username]);

            if(rows.length > 0) {
                const user = rows[0];
                const isPasswordMatch = await bycrypt.compare(password, user.password);


                if(isPasswordMatch) {
                    return rows;
                }
                else {
                    return [];
                }
            }

            //returning the data
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getLoginByUserName: async (username) => {
        try {
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectLogin, [username]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    

    getUserByUsername: async (username) => {
        try {
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectUserByUsername, [username]);
            if (rows.length > 0) {
                return rows[0]; // Assuming there is only one user with a given username}
            }
            else {
                return null; // No user found with the given username
            }
        } catch (error) {
            throw error;
        }
    },

    //Method to register a new user
    registerUser: async (username, password, role) => {
        try {


            // Hash the password before storing it
            const hashedPassword = await bycrypt.hash(password, 10);

            const [result, fields] = await db.executeQuery(sql.loginSQl.insertUser, [username, hashedPassword, role]);

            console.log("Password Actual: ", password);

            return result.insertId; // Return the ID of the newly inserted user
        } catch (error) {
            throw error
        }
    }

}

module.exports = loginModel;