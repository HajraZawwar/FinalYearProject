const db = require('../constants/db');
const loginSQl = require('../constants/sql');
const config = require('../constants/config');


const loginModel = {
    getAllLogins: async () => {
        try {
            // getting the connection
            const connection = await db.getConnection();
            // getting the data from the database
            const [rows, fields] = await connection.query(loginSQl.selectAll);
            // releasing the connection
            connection.release();
            // returning the data
            res.json(config.responseGenerator(false, rows, null));
        } catch (error) {
            res.json(config.responseGenerator(true, "error", error));
        }
    },

    getLogin: async (username, password) => {
        try {

            //getting the connection
            const connection = await db.getConnection();

            //getting the data from the database
            const [rows, fields] = await connection.query(loginSQl.selectLogin, [username, password]);

            //releasing the connection
            connection.release();

            //returning the data
            return rows;
        } catch (error) {
            return error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const connection = await db.getConnection();
            const [rows, fields] = await connection.query(loginSQl.selectUserByUsername, [username]);
            connection.release();
            return rows[0]; // Assuming there is only one user with a given username
        } catch (error) {
            return error;
        }
    },

    //Method to register a new user
    registerUser: async (username, password, role) => {
        try {
            const connection = await db.getConnection();
            const [result] = await connection.query(loginSQl.insertUser, [username, password, role]);
            connection.release();

            return result.insertId; // Return the ID of the newly inserted user
        } catch (error) {
            return error;
        }
    }

}

module.exports = loginModel;