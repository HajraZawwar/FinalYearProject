const db = require('../constants/db');
const SqlQueries = require('../constants/sql');
const config = require('../constants/config');
const { query } = require('express');


// Get all the courses

const courseModel =
{
    getAllCourses: async () => {
        try {  
          const res = await db.executeQuery(SqlQueries.courseSQl.selectAll,[]);
          return res;
        } catch (error) { 
            throw error;
        }
    }

}

module.exports = courseModel;


