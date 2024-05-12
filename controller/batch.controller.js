const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const sql = require('../constants/sql.js');
const batchModel = require('../models/batch.model.js');

const batchController = {
    getAllBatches: async (req, res) => {
        try {
            const data = await batchModel.getAllBatches();
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error.message))
        }

    },

    getBatchById: async (req, res) => {
        try {
            const BatchID = req.body.BatchID;
            const [data, fields] = await batchModel.getBatchById(BatchID);
            res.json(config.responseGenerator(false, data, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error.message))
        }
    },

    addBatch: async (req, res) => {
        try {
            const BatchName = req.body.BatchName;

            const result = await batchModel.addBatch(BatchName);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            res.json(config.responseGenerator(true, null, error.message))
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
            res.json(config.responseGenerator(true, null, error.message))
        }

    },

    deleteBatch: async (req, res) => {
        try {

            const BatchID = req.body.BatchID;

            const result = await batchModel.deleteBatch(BatchID);
            res.json(config.responseGenerator(false, result, ""));
        }

        catch (error) {
            console.log(error)
            res.status(500).json(config.responseGenerator(true, null, error.message))
        }

    }
};

module.exports = batchController;
