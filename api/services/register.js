const crypto = require("crypto");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authenticateRequest");

// const secretKey = crypto.randomBytes(32);
// const initVector = crypto.randomBytes(16);
// const dataToBeEncrypted = "Lincoln";

// const cipherObject = crypto.createCipheriv(
//     "aes-256-cbc",
//     Buffer.from(secretKey),
//     initVector
// );

// const decipherObject = crypto.createDecipheriv(
//     "aes-256-cbc",
//     Buffer.from(secretKey, "hex"),
//     initVector
// );

// Defining algorithm
const algorithm = "aes-256-cbc";

// Defining key
const key = crypto.randomBytes(32);

// Defining iv
const iv = crypto.randomBytes(16);

function encrypt(text) {
    // Creating Cipheriv with its parameter
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

    // Updating text
    let encrypted = cipher.update(text);

    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Returning iv and encrypted data
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decrypt(text) {
    try {
        let iv = Buffer.from(text.iv, "hex");
        let encryptedText = Buffer.from(text.encryptedData, "hex");

        // Creating Decipher
        let decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            Buffer.from(key),
            iv
        );

        // Updating encrypted text
        let decrypted = decipher.update(encryptedText);
        console.log(decrypted);
        // decrypted = Buffer.concat([decrypted, decipher.final("hex")]);
        decrypted = Buffer.concat([decrypted, decipher.final("base64")]);
        // console.log(decrypted.toString());
        // returns data after decryption
        return decrypted.toString();
    } catch (e) {
        return { e };
    }
}

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
            // const accessToken = jwt.sign(
            //     { email: email },
            //     process.env.ACCESS_TOKEN_SECRET
            // );

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
