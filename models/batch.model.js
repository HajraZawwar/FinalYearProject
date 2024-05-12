const db = require('../constants/db');
const sql = require('../constants/sql');
const config = require('../constants/config');


const batchModel = {
    getAllBatches: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.batchSQl.selectAll);
            return rows;
        } catch (error) {
           throw error;
        }
    },

    getBatchById: async function (BatchID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.batchSQl.findBatchById, [BatchID]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    addBatch: async function (BatchName) {
        try {

            // Check if the batch already exists
            const [rows, fields] = await db.executeQuery(sql.batchSQl.findBatchByName, [BatchName]);

            if (rows.length > 0) {
                throw new Error("Batch already exists");
            }

            const result = await db.executeQuery(sql.batchSQl.addBatch, [BatchName]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateBatch: async function (BatchName, BatchID) {
        try {

            // Check if the batch already exists
            const [rows, fields] = await db.executeQuery(sql.batchSQl.findBatchById, [BatchID]);

            if (rows.length === 0) {
                throw new Error("Batch does not exist");
            }


            const result = await db.executeQuery(sql.batchSQl.updateBatch, [BatchName, BatchID]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteBatch: async function (BatchID) {
        try {


            // Write some complex query to check if the batch is associated with any student
            // Check if the batch is associated with any student
            // const [rows, fields] = await db.executeQuery(sql.batchSQl., [BatchID]);

            // if (rows.length > 0) {
            //      throw new Error("Batch is associated with student");
            // }

            const result = await db.executeQuery(sql.batchSQl.deleteBatch, [BatchID]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = batchModel;
