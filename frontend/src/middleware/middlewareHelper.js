import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const bp = require("../components/Paths");
let token = cookies.get("jwt");
token = token !== null ? token : sessionStorage.getItem("accessToken");

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

class Express {
    async call(functionName, parameters) {
        // console.log("helper: + " + token);
        // console.log(cookies.get("jwt"));
        const results = await Axios.post(
            bp.buildPath(functionName),
            parameters,
            config
        );
        return results;
    }
}

export default new Express();
