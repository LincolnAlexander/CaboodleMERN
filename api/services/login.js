// global.services["Login"] = async ({ email, password }) => {
//     try {
//         if (!email || !password) return { error: "Missing paramaters" };
//         const loginInfo = await global.database["Users"].findOne({
//             $or: [{ email: email }, { profileName: email }],
//             password,
//         });

//         // if(loginInfo) not working
//         if (loginInfo === null) {
//             return { status: 500, success: false };
//         }
//         return { status: 200, success: true, user_id: loginInfo._id };
//     } catch (e) {
//         return e;
//     }
// };
