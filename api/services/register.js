const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const Encrypt = (input) => {
    return cryptojs.AES.encrypt(input, "key").toString();
};

global.services["Register"] = async ({ email, password, profileName }) => {
    try {
        if (!email || !password || !profileName)
            return { error: "Missing parameters" };

        let encryptedText = Encrypt(password);

        const existingUser = await global.database["Users"].findOne({
            $or: [{ email: email }, { profileName: profileName }],
        });

        if (existingUser) {
            return {
                status: 500,
                error: "Email/Profile in use, sign up with a new one",
            };
        }

        try {
            await global.database["Users"].insertOne({
                email,
                profileName,
                encryptedText,
            });

            return { status: 200, success: true };
        } catch (e) {
            return e;
        }
    } catch (e) {
        return e;
    }
};
