const { ObjectId } = require("mongodb");
const auth = require("../middleware/authenticateRequest");

global.services["createCaboodle"] = async (
    { name, description, user_id, image },
    header
) => {
    try {
        if (!name || !description || !user_id)
            return { error: "Missing parameters" };
        let authenticatedUser = auth.authenticateRequest(header);
        if (user_id !== authenticatedUser.user_id)
            return { error: "Unauthrized user" };
        const caboodle = {
            nickname: name,
            description,
            user_id: new ObjectId(user_id),
            elementos: [],
            image,
        };

        await global.database["Caboodles"].insertOne(caboodle);

        return { status: 200, success: "true" };
    } catch (e) {
        return e;
    }
};

global.services["LoadCaboodles"] = async ({ user_id, skip }, header) => {
    try {
        if (!user_id) return { error: "Missing parameters" };
        let authenticatedUser = auth.authenticateRequest(header);
        if (user_id !== authenticatedUser.user_id)
            return { error: "Unauthrized user" };
        const results = await global.database["Caboodles"]
            .find({ user_id: new ObjectId(user_id) })
            .skip(skip)
            .limit(5)
            .toArray();
        const totalCaboodles = await global.database["Caboodles"]
            .find({ user_id: new ObjectId(user_id) })
            .toArray();
        // console.log(header);

        return { results, totalCaboodles };
    } catch (e) {
        return e;
    }
};

global.services["DeleteCaboodle"] = async ({ caboodleId, user_id }, header) => {
    try {
        if (!caboodleId) return { error: "Missing caboodle id" };
        let authenticatedUser = auth.authenticateRequest(header);
        if (user_id !== authenticatedUser.user_id)
            return { error: "Unauthrized user" };
        const results = await global.database["Caboodles"].deleteOne({
            _id: new ObjectId(caboodleId),
        });
        const deleteElementos = await global.database["Elementos"].deleteMany({
            caboodle_id: new ObjectId(caboodleId),
        });

        if (results.deletedCount == 1 || deleteElementos.deletedCount > 0)
            return { status: 200, success: "true" };

        return { status: 500 };
    } catch (e) {
        return e;
    }
};

global.services["EditCaboodle"] = async (
    { caboodleId, name, image, description, user_id },
    header
) => {
    try {
        let authenticatedUser = auth.authenticateRequest(header);
        if (user_id !== authenticatedUser.user_id)
            return { error: "Unauthrized user" };
        const results = await global.database["Caboodles"].updateOne(
            {
                _id: new ObjectId(caboodleId),
            },
            {
                $set: {
                    nickname: name,
                    image: image,
                    description: description,
                },
            }
        );

        if (results.matchedCount == 1) return { status: 200 };

        return { status: 500 };
    } catch (e) {
        return e;
    }
};
