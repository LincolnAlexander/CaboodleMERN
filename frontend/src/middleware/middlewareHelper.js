import Axios from "axios";

const bp = require("../components/Paths");

class Express {
    async call(functionName, parameters) {
        const token = sessionStorage.getItem("accessToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const results = await Axios.post(
            bp.buildPath(functionName),
            parameters,
            config
        );
        return results;
    }

    async callPublic(functionName, paramaters) {
        const results = await Axios.post(
            "http://localhost:5000/public/" + functionName,
            paramaters
        );

        return results;
    }
}

export default new Express();
