const { getDatabase } = require("../mongoConnect");

const database = getDatabase();

global.database["Caboodles"] = database && database.collection("Caboodles");

module.exports = {
    Caboodles: database && database.collection("Caboodles"),
};
