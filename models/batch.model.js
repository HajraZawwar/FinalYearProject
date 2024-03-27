const db = require('../constants/db');
const query = require('../constants/sql');
const config = require('../constants/config');


const batchModel = {
    getAllBatches: async function () {
        try {
            const [rows, fields] = await db.executeQuery(query.batchQueries.selectAll);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getBatchById: async function (batchId) {
        try {
            const [rows, fields] = await db.executeQuery(query.batchQueries.findBatchById, [batchId]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addBatch: async function (batchName, startDate, endDate) {
        try {
            const result = await db.executeQuery(query.batchQueries.addBatch, [batchName, startDate, endDate]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateBatch: async function (batchName, startDate, endDate, batchId) {
        try {
            const result = await db.executeQuery(query.batchQueries.updateBatch, [batchName, startDate, endDate, batchId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteBatch: async function (batchId) {
        try {
            const result = await db.executeQuery(query.batchQueries.deleteBatch, [batchId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = batchModel;
