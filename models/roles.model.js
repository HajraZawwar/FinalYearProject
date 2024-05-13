const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');

const roleModel = {
    getAllRoles: async () => {
        try {
            const [rows, fields] = await db.executeQuery(sql.roleSQl.selectAll);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getRoleById: async (roleId) => {
        try {
            const [rows, fields] = await db.executeQuery(sql.roleSQl.selectRoleById, [roleId]);
            if (rows.length > 0) {
                return rows; // There is only one role with a given roleId
            }
            else {
                return null; // No role found with the given roleId
            }
        } catch (error) {
            throw error;
        }
    },

    getRoleByName: async (roleName) => {
        // to be implemeted
    }
    ,
    addRole: async (roleName) => {
        try {
            const result = await db.executeQuery(sql.roleSQl.addRole, [roleName]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateRole: async (roleName, roleId) => {
        try {
            // console.log(roleId, roleName)
            const result = await db.executeQuery(sql.roleSQl.updateRole, [roleName, roleId]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteRole: async (roleId) => {
        try {
            const result = await db.executeQuery(sql.roleSQl.deleteRole, [roleId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = roleModel;