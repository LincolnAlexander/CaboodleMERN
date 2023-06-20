const express = require("express");
const cors = require("cors");
const path = require("path");

process.env.PORT = process.env.PORT ? process.env.PORT : "5000";

require("dotenv").config({
    path: path.resolve(__dirname, "dev.env"),
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const { connectToDB } = require("./mongoConnect");

connectToDB((err) => {
    if (err) {
        console.log("Couldn't connect to database");
        return;
    }

    app.listen(process.env.PORT, () => {
        console.log("Connecting to port " + process.env.PORT);
    });

    app.use("/", require("./services/serviceIndex"));
});
