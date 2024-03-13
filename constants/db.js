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
    ,
    executeQuery: async (query, params) => {
        const connection = await pool.getConnection();
        try {
            const [rows, fields] = await connection.execute(query, params);
            return  [rows, fields];
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}