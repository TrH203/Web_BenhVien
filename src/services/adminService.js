import db from "../models/index";

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                attributes: ["id", "email", "firstName", "lastName", "phoneNumber"],
                raw: true,
            })
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
const get1User = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findByPk(id, {
                attributes: ["id", "email", "firstName", "lastName", "phoneNumber"],
                raw: true,
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    get1User: get1User,
}