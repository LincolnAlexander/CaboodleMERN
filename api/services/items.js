var ObjectId = require("mongodb").ObjectId;

global.services["Items"] = async (newImage) => {
    try {
        const results = await global.database["Items"].insertOne({
            image: newImage,
            num: 1000,
        });
        return results;
    } catch (e) {
        console.log(e);
    }
};

// db.Users.aggregate({$lookup : {from : 'Caboodles', localField: '_id', foreignField : 'user_id', as: "Users Caboodles"}}).pretty()
// db.Items.insert({"user_id" : new ObjectId('647617146a213f86014d308d')})
global.services["test"] = async ({ number } = {}) => {
    try {
        return { test: number + 10 };
    } catch (e) {
        console.log(e);
    }
};
