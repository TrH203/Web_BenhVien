import db from "../models/index";

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        let returnData = { users: {} };
        try {
            let users = await db.Users.findAll({
                attributes: { exclude: ["password"] },
            })
            returnData.errCode = 0;
            returnData.message = "get all users";
            returnData.users = users;
            resolve(returnData);
        } catch (e) {
            returnData.errCode = 4;
            returnData.message = e;
            reject(returnData);
        }
    })
}
const get1User = (id) => {
    return new Promise(async (resolve, reject) => {
        let returnData = { users: {} };
        try {
            let user = await db.Users.findByPk(id, {
                attributes: { exclude: ["password"] },
            })
            if (user) {
                returnData.errCode = 0;
                returnData.message = "get one user";
                returnData.users = user;
                resolve(returnData);
            }
            else {
                returnData.errCode = 5;
                returnData.message = "not found user";
                resolve(returnData);
            }
        } catch (e) {
            returnData.errCode = 0;
            returnData.message = e;
            reject(returnData);
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    get1User: get1User,
}