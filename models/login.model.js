const db = require('../constants/db');
const loginSQl = require('../constants/sql');
const config = require('../constants/config');


const loginModel = {
    getAllLogins: async () => {
        try {
          
            // getting the data from the database
            const [rows, fields] = await db.executeQuery(loginSQl.selectAll, null);
           
           return rows;

        } catch (error) {
            console.log(error);
            res.json(config.responseGenerator(true, "", error));
        }
    },

    getLogin: async (username, password) => {
        try {

            //getting the data from the database
            // Exevcute the query
            const[rows,fields] = await db.executeQuery(loginSQl.selectLogin, [username, password]);

            //returning the data
            return rows;
        } catch (error) {
            return error;
        }
    }

}

module.exports = loginModel;