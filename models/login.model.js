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
            const connection = await db.getConnection();
            const [rows, fields] = await connection.query(sql.loginSQl.selectUserByUsername, [username]);
            connection.release();
            // console.log(rows);
            return rows[0]; // Assuming there is only one user with a given username
        } catch (error) {
            return error;
        }
    },

    //Method to register a new user
    registerUser: async (username, password, role) => {
        try {
            const connection = await db.getConnection();
            const [result] = await connection.query(sql.loginSQl.insertUser, [username, password, role]);
            connection.release();

            return result.insertId; // Return the ID of the newly inserted user
        } catch (error) {
            return error;
        }
    }

}

module.exports = loginModel;