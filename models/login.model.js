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
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
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
            console.log("Error fetching user by username:", error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    //Method to register a new user
    registerUser: async (username, password, role) => {
        try {
            const [result] = await db.executeQuery(sql.loginSQl.insertUser, [username, password, role]);

            return result.insertId; // Return the ID of the newly inserted user
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }

}

module.exports = loginModel;