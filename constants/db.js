const config = require('./config.js');
const db = require("mysql2/promise.js");

const pool = db.createPool({
    host: config.dbConfig.HOST,
    user: config.dbConfig.USER,
    password: config.dbConfig.PASSWORD,
    database: config.dbConfig.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = {
    getConnection: async () => {
        return await pool.getConnection();
    }
}
