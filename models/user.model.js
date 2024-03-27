const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const userModel = {
    getAllUsers: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.loginSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },
}

module.exports = userModel;