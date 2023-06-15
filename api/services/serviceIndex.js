const express = require("express");
const router = express.Router();

global.services = {};

// List of collections
require("./register");
require("./caboodles");
require("./elementos");
require("./login");

function buildServiceRoutes(index) {
    try {
        const keys = Object.keys(index);

        for (let i = 0; i < keys.length; i++) {
            const serviceName = keys[i];
            const service = index[serviceName];

            router.post("/svc/" + serviceName, async function (req, res) {
                let results = {};

                try {
                    results = await service(
                        req.body,
                        req.headers.authorization
                    );
                    // console.log("Header " + req.headers.authorization);
                } catch (e) {
                    console.log(e);
                }

                return res.status(200).json(results);
            });
        }
    } catch (e) {
        console.log(e);
    }
}

buildServiceRoutes(global.services);

module.exports = router;
