const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const campusModel = {
    getAllCampuses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.campusSQl.selectAll, null);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getCampusById: async function (CampusID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.campusSQl.findCampusById, [CampusID]);
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

    addCampus: async function (CampusName) {
        try {
            const result = await db.executeQuery(sql.campusSQl.addCampus, [CampusName]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateCampus: async function (CampusName, CampusID) {
        try {

            // Check if the campus already exists
            const [rows, fields] = await db.executeQuery(sql.campusSQl.findCampusById, [CampusID]);

            if (rows.length === 0) {
                throw new Error("Campus does not exist");
            }

            const result = await db.executeQuery(sql.campusSQl.updateCampus, [CampusName, CampusID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteCampus: async function (CampusID) {
        try {

            const result = await db.executeQuery(sql.campusSQl.deleteCampus, [CampusID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = campusModel;