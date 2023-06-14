const { getDatabase } = require("../mongoConnect");

const database = getDatabase();

global.database["Users"] = database && database.collection("Users");

module.exports = {
    Users: database && database.collection("Users"),
};
