const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const userModel = {
    getAllUsers: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}

module.exports = userModel;