const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');

const departmentModel = {
    getAllDepartments: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.departmentQueries.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


    addDepartment: async function (departmentName) {
        try {
            const result = await db.executeQuery(query.departmentQueries.addDepartment, [departmentName]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateDepartment: async function (departmentName, departmentId) {
        try {
            const result = await db.executeQuery(query.departmentQueries.updateDepartment, [departmentName, departmentId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteDepartment: async function (departmentId) {
        try {
            const result = await db.executeQuery(query.departmentQueries.deleteDepartment, [departmentId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = departmentModel;