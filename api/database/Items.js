const { getDatabase } = require("../mongoConnect");

const database = getDatabase();

global.database["Items"] = database && database.collection("Items");

module.exports = {
    Items: database && database.collection("Items"),
};
