const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const roleModel = require('../models/roles.model.js');

const roleController = {

    getAllRoles: async (req, res) => {
        try {

            const [data, fields] = await roleModel.getAllRoles();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getRoleById: async (req, res) => {
        try {
            const RoleID = req.params.RoleID;
            const [data, fields] = await roleModel.getRoleById(RoleID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addRole: async (req, res) => {
        try {
            const role = req.body.role;

            const result = await roleModel.addRole(role);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateRole: async (req, res) => {
        try {
            const role = req.body.role;
            const RoleID = req.body.RoleID;

            const result = await roleModel.updateRole(role, RoleID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteRole: async (req, res) => {
        try {
            const RoleID = req.params.RoleID;

            const result = await roleModel.deleteRole(RoleID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
};

module.exports = roleController;