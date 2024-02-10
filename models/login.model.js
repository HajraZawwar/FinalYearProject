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
    }

}

module.exports = loginModel;