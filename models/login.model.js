const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const loginModel = {
    getAllLogins: async () => {
        try {

            // getting the data from the database
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectAll, null);

            return rows;

        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getLogin: async (username, password) => {
        try {

            //getting the data from the database
            // Exevcute the query
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectLogin, [username, password]);

            //returning the data
            return rows;
        } catch (error) {
            return error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const [rows, fields] = await db.executeQuery(loginSQl.selectUserByUsername, [username]);
            return rows[0]; // Assuming there is only one user with a given username
        } catch (error) {
            return error.message;
        }
    },

    //Method to register a new user
    registerUser: async (username, password, role) => {
        try {
            const [result] = await db.executeQuery(loginSQl.insertUser, [username, password, role]);

            return result.insertId; // Return the ID of the newly inserted user
        } catch (error) {
            return error;
        }
    }

}

module.exports = loginModel;