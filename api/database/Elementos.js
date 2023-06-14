const { getDatabase } = require("../mongoConnect");

const database = getDatabase();

global.database["Elementos"] = database && database.collection("Elementos");

module.exports = {
    Elementos: database && database.collection("Elementos"),
};
