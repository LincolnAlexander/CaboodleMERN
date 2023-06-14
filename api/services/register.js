const crypto = require("crypto");
const cryptojs = require("crypto-js");

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
        // Encrypt(password);

        const existingUser = await global.database["Users"].findOne({
            email,
        });

        if (existingUser) {
            return { status: 500, success: false };
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

        return { status: 200, success: true, user_id: findUser[0]._id };
    } catch (e) {
        return e;
    }
};
