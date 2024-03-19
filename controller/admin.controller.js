// All admin related task will be done over here


// All the imports will be done here
const db = require('./../constants/db.js');
const config = require('./../constants/config.js');
const loginSQl = require('../constants/sql.js');
const courseModel = require('../models/course.model.js');


const adminController ={
    getAllCourses : async (req,res) => {
        try{

            const [data, fields] = await courseModel.getAllCourses();
            res.json(config.responseGenerator(false, data,""));
        }

        catch(error)
        {
            res.json(config.responseGenerator(true, null,error))
        }

    }
}

module.exports = adminController;


