const db = require('../constants/db.js');
const config = require('../constants/config.js');
const sql = require('../constants/sql.js');

const sectionModel = {

    getAllSections: async function () {
        try {
            const [rows, fields] = await db.executeQuery(sql.sectionSQl.selectAll);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getSectionByid: async function (SectionID) {
        try {
            const [rows, fields] = await db.executeQuery(sql.sectionSQl.selectSectionById, [SectionID]);
            return rows;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    addSection: async function (SectionName) {
        try {
            const result = await db.executeQuery(sql.sectionSQl.addSection, [SectionName]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    updateSection: async function (SectionName, SectionID) {
        try {
            const result = await db.executeQuery(sql.sectionSQl.updateSection, [SectionName, SectionID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    deleteSection: async function (SectionID) {
        try {
            const result = await db.executeQuery(sql.sectionSQl.deleteSection, [SectionID]);
            return result;
        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    }
};

module.exports = sectionModel;