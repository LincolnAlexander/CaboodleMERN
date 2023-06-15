const crypto = require("crypto");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const Encrypt = (input) => {
    return cryptojs.AES.encrypt(input, "key").toString();
};

const Decrypt = (input) => {
    return cryptojs.AES.decrypt(input, "key").toString(cryptojs.enc.Utf8);
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
        // console.log(process.env.ACCESS_TOKEN_SECRET);
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
