const dbConfig = {
    HOST: "localhost",
    PORT: 3306,
    USER: "root",
    PASSWORD: "root",
    DB: "fyp"
};

const expressPort = 9898;

const JWT_SECRET ="ILOVEJAVA";

const responseGenerator= (error, data, message) => {
    return {
        error: error,
        data: data,
        message: message
    }
}  

module.exports = {dbConfig, JWT_SECRET, expressPort, responseGenerator};


