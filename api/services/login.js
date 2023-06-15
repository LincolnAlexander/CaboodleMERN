const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const Decrypt = (input) => {
    return cryptojs.AES.decrypt(input, "key").toString(cryptojs.enc.Utf8);
};

global.services["Login"] = async ({ email, password }) => {
    try {
        if (!email || !password) return { error: "Missing paramaters" };

        let findUser = await global.database["Users"]
            .find({ $or: [{ email: email }, { profileName: email }] })
            .toArray();
        const decryptedPassword = Decrypt(findUser[0].encryptedText);

        if (decryptedPassword !== password) {
            return { status: 500, success: false };
        }
        const accessToken = jwt.sign(
            { user_id: findUser[0]._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return {
            status: 200,
            success: true,
            user_id: findUser[0]._id,
            webToken: accessToken,
        };
    } catch (e) {
        return e;
    }
};
