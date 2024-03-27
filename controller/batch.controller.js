const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const batchModel = require('../models/batch.model.js');

const batchController = {
    getAllBatches: async (req, res) => {
        try {

            const [data, fields] = await batchModel.getAllBatches();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    getBatchById: async (req, res) => {
        try {
            const BatchID = req.params.BatchID;
            const [data, fields] = await batchModel.getBatchById(BatchID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }
    },

    addBatch: async (req, res) => {
        try {
            const BatchName = req.body.BatchName;

            const result = await batchModel.addBatch(BatchName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    updateBatch: async (req, res) => {
        try {
            const BatchName = req.body.BatchName;
            const BatchID = req.body.BatchID;

            const result = await batchModel.updateBatch(BatchName, BatchID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    },

    deleteBatch: async (req, res) => {
        try {
            const BatchID = req.body.BatchID;

            const result = await batchModel.deleteBatch(BatchID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error))
        }

    }
};

module.exports = batchController;
