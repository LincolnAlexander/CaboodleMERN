const jwt = require("jsonwebtoken");

exports.authenticateRequest = function authenticateRequest(header) {
    const token = header && header.split(" ")[1];
    if (token == null) return "alse";
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
