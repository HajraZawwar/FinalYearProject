const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const departmentModel = require('../models/department.model.js');

const departmentController = {

    getAllDepartments: async (req, res) => {
        try {

            const [data, fields] = await departmentModel.getAllDepartments();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getDepartmentById: async (req, res) => {
        try {
            const DepartmentID = req.params.DepartmentID;
            const [data, fields] = await departmentModel.getDepartmentById(DepartmentID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addDepartment: async (req, res) => {
        try {
            const DepartmentName = req.body.DepartmentName;

            const result = await departmentModel.addDepartment(DepartmentName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateDepartment: async (req, res) => {
        try {
            const DepartmentName = req.body.DepartmentName;
            const DepartmentID = req.body.DepartmentID;

            const result = await departmentModel.updateDepartment(DepartmentName, DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteDepartment: async (req, res) => {
        try {
            const DepartmentID = req.body.DepartmentID;

            const result = await departmentModel.deleteDepartment(DepartmentID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
};

module.exports = departmentController;