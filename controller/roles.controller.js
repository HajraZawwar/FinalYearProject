const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');
const roleModel = require('../models/roles.model.js');

const roleController = {

    getAllRoles: async (req, res) => {
        try {

            const data = await roleModel.getAllRoles();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    getRoleById: async (req, res) => {
        try {
            const RoleID = req.params.RoleID;
            const data = await roleModel.getRoleById(RoleID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }
    },


    addRole: async (req, res) => {
        try {
            const role = req.body.role;

            const result = await roleModel.addRole(role);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },
    getRoleByName: async (req, res) => {
        try {
            const role = req.body.role;

            const data = roleModel.getRoleByName(role)

            res.json(config.responseGenerator(false, data, ""));
        }
        catch (error) {
            res.json(config.responseGenerator(false, result, ""));
        }
    },

    updateRole: async (req, res) => {
        try {
            const role = req.body.role;
            const RoleID = req.body.roleId;

            console.log(req.body);

            // Check if the  role exits
            const found = await roleModel.getRoleById(RoleID);

            if (found == null) {
                res.json(config.responseGenerator(true, null, "The role does not exist"));
                return;
            }

            const result = await roleModel.updateRole(role, RoleID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteRole: async (req, res) => {
        try {
            const RoleID = req.params.RoleID;

            const result = await roleModel.deleteRole(RoleID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
};

module.exports = roleController;