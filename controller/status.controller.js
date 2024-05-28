
const statusModel = require('../models/status.model.js');

const statusController = {
    getAllStatuses: async (req, res) => {
        try {
            const data = await statusModel.getAllStatus();
            res.json(data);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    ,
    getStatusByName: async (req, res) => {
        try {
            const { StatusName } = req.query;
            const data = await statusModel.getStatusByName(StatusName);
            res.json(data);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};

module.exports = statusController;
