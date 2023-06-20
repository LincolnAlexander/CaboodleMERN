const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticateRequest");

global.services = {};
global.public = { services: {} };

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
                    // Authenticate
                    const authenticatedUser = auth.authenticateRequest(
                        req.headers.authorization
                    );

                    if (req.body.user_id != authenticatedUser.user_id) {
                        return res
                            .status(401)
                            .json({ error: "Unauthorized user" });
                    }

                    results = await service(
                        req.body,
                        req.headers.authorization
                    );
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

function buildPublicServieRoutes(index) {
    try {
        const keys = Object.keys(index);
        for (let i = 0; i < keys.length; i++) {
            const serviceName = keys[i];
            const service = index[serviceName];

            router.post("/public/" + serviceName, async function (req, res) {
                let results = {};

                try {
                    results = await service(req.body);
                } catch (e) {
                    return res.status(500).json({ error: "err" });
                }
                return res.status(200).json(results);
            });
        }
    } catch (e) {
        console.log(e);
    }
}

buildServiceRoutes(global.services);
buildPublicServieRoutes(global.public.services);

module.exports = router;
