const db = require('../constants/db');
const sql = require('../constants/sql');

const statusModel = {
    addStatus: async function (StatusName) {
        try {
            const result = await db.executeQuery(sql.statusSQl.addStatus, [StatusName]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllStatus: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.statusSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getStatusByName: async function (StatusName) {
        try {
            const [rows, fields] = await db.executeQuery(sql.statusSQl.findStatusByName, [StatusName]);
            if (rows.length > 0) {
                return rows;
            }
            else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },
};

module.exports = statusModel;