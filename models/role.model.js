const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const roleModel = {
    getRoleById: async (roleId) => {
        try {
            const [rows, fields] = await db.executeQuery(sql.roleSQl.getRoleById, [roleId]);
            if (rows.length > 0) {
                return rows[0]; // There is only one role with a given roleId
            }
            else {
                return null; // No role found with the given roleId
            }
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
}

module.exports = roleModel;