const { ObjectId } = require("mongodb");
const auth = require("../middleware/authenticateRequest");

global.services["CreateElemento"] = async ({
    name,
    cost,
    purchased,
    link,
    priority,
    caboodle_id,
}) => {
    try {
        if (!name || !cost || !caboodle_id)
            return { error: "Missing parameters" };

        let elemento = {
            elementoName: name,
            elementoCost: cost,
            elementoPurchased: purchased,
            elementoUrl: link,
            elementoPriority: priority,
            caboodle_id: new ObjectId(caboodle_id),
        };

        await global.database["Elementos"].insertOne(elemento);

        return { status: 200, success: "true" };
    } catch (e) {
        return e;
    }
};

global.services["LoadElementos"] = async ({ caboodleId }) => {
    try {
        if (!caboodleId) return { error: "Missing caboodleId" };

        const results = await global.database["Elementos"]
            .find({ caboodle_id: new ObjectId(caboodleId) })
            .toArray();

        return { results };
    } catch (e) {
        return e;
    }
};

global.services["DeleteElemento"] = async ({ elemento_id }) => {
    try {
        if (!elemento_id) return { error: "Missing elemento_id" };

        const deleted = await global.database["Elementos"].deleteOne({
            _id: new ObjectId(elemento_id),
        });

        if (deleted.deletedCount == 1) return { status: 200 };
        return { status: 500 };
    } catch (e) {
        return e;
    }
};

global.services["EditElemento"] = async ({
    name,
    cost,
    priority,
    purchased,
    link,
    elemento_id,
}) => {
    try {
        if (!elemento_id) return { error: "Missing elemento_id" };

        const results = await global.database["Elementos"].updateOne(
            { _id: new ObjectId(elemento_id) },
            {
                $set: {
                    elementoName: name,
                    elementoCost: cost,
                    elementoPriority: priority,
                    elementoPurchased: purchased,
                    elementoUrl: link,
                },
            }
        );

        if (results.matchedCount == 1) return { status: 200 };

        return { status: 500 };
    } catch (e) {
        return e;
    }
};
