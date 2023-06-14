import Axios from "axios";

const bp = require("../components/Paths");

const config = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
};
class Express {
    async call(functionName, parameters) {
        console.log("helper: + " + sessionStorage.getItem("accessToken"));
        const results = await Axios.post(
            bp.buildPath(functionName),
            parameters,
            config
        );
        return results;
    }
}

export default new Express();
