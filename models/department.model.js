const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const departmentModel = {
    getAllDepartments: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.departmentSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getDepartmentById: async function (DepartmentID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.departmentSQl.selectDepartmentById, [DepartmentID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addDepartment: async function (DepartmentName) {
        try {
            const result = await db.executeQuery(sql.departmentSQl.addDepartment, [DepartmentName]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateDepartment: async function (DepartmentName, DepartmentID) {
        try {
            const result = await db.executeQuery(sql.departmentSQl.updateDepartment, [DepartmentName, DepartmentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteDepartment: async function (DepartmentID) {
        try {
            const result = await db.executeQuery(sql.departmentSQl.deleteDepartment, [DepartmentID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = departmentModel;