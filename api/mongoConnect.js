const { MongoClient } = require("mongodb");

const host = process.env.MONGO_HOST;
const database = process.env.MONGO_DB;

let dbConnection;

global.database = {};

module.exports = {
    connectToDB: (callback) => {
        MongoClient.connect(host + "/" + database)
            .then((client) => {
                dbConnection = client.db();
                require("./database/databaseIndex");
                return callback();
            })
            .catch((err) => {
                console.log(err + "error");
                return callback(err);
            });
    },
    getDatabase: () => dbConnection,
};
