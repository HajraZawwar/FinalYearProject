const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const batchModel = {
    getAllBatches: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.batchSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getBatchById: async function (BatchID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.batchSQl.findBatchById, [BatchID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addBatch: async function (BatchName) {
        try {
            const result = await db.executeQuery(sql.batchSQl.addBatch, [BatchName]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateBatch: async function (BatchName, BatchID) {
        try {
            const result = await db.executeQuery(sql.batchSQl.updateBatch, [BatchName, BatchID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteBatch: async function (BatchID) {
        try {
            const result = await db.executeQuery(sql.batchSQl.deleteBatch, [BatchID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = batchModel;
