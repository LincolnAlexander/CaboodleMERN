import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
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
}

export default new Express();
