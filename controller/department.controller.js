const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const departmentModel = require('../models/department.model.js');

const departmentController = {

    getAllDepartments: async (req, res) => {
        try {

            const data = await departmentModel.getAllDepartments();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getDepartmentById: async (req, res) => {
        try {
            const DepartmentID = req.query.DepartmentID;
            const data = await departmentModel.getDepartmentById(DepartmentID);

            if (data == null) {
                res.json(config.responseGenerator(true, null, "Department does not exist"));
                return;
            }

            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },

    addDepartment: async (req, res) => {
        try {
            const DepartmentName = req.body.DepartmentName;
            const result = await departmentModel.addDepartment(DepartmentName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    updateDepartment: async (req, res) => {
        try {
            const DepartmentName = req.body.DepartmentName;
            const DepartmentID = req.body.DepartmentID;

            // Check if the department already exists
            const found = await departmentModel.getDepartmentById(DepartmentID);
            if (found == null) {
                res.json(config.responseGenerator(true, null, "Department does not exist"));
                return;
            }

            const result = await departmentModel.updateDepartment(DepartmentName, DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message));
        }

    },

    deleteDepartment: async (req, res) => {
        try {
            const DepartmentID = req.body.DepartmentID;

            const result = await departmentModel.deleteDepartment(DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
};

module.exports = departmentController;