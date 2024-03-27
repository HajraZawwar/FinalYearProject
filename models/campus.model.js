const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const campusModel = {
    getAllCampuses: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.campusSQl.selectAll, null);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getCampusById: async function (CampusID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.campusSQl.findCampusById, [CampusID]);
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addCampus: async function (CampusName) {
        try {
            const result = await db.executeQuery(sql.campusSQl.addCampus, [CampusName]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateCampus: async function (CampusName, CampusID) {
        try {
            const result = await db.executeQuery(sql.campusSQl.updateCampus, [CampusName, CampusID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteCampus: async function (CampusID) {
        try {
            const result = await db.executeQuery(sql.campusSQl.deleteCampus, [CampusID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = campusModel;