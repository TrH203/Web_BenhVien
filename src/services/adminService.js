import e from "cors";
import db from "../models/index";
import bcrypt from "bcrypt";
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
                returnData.message = "not found user to get";
                resolve(returnData);
            }
        } catch (e) {
            returnData.errCode = 0;
            returnData.message = e;
            reject(returnData);
        }
    })
}

const checkIsDuplicateEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: email }
            });
            if (user === null) { // no duplicate
                resolve(false);
            }
            resolve(true); // duplicated
        } catch (e) {
            console.log(e);
        }
    })
}

let hashPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10); // get Salt (how to hash)
        let hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        throw e;
    }
}

const createNewUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        let returnData = { user: {} };
        try {
            if (await checkIsDuplicateEmail(data.email)) {
                returnData.errCode = 7;
                returnData.message = "email is duplicated";
            }
            else {
                let user = db.Users.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender === '1' ? true : false,
                    email: data.email,
                    password: await hashPassword(data.password),
                    address: data.address,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                })
                returnData.errCode = 0;
                returnData.message = "create ok";
                returnData.user = user;
            }
            resolve(returnData);
        } catch (e) {
            returnData.errCode = 6;
            returnData.message = e;
            console.log(e);
            reject(returnData);
        }
    })
}

const editUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        let returnData = { user: {} };
        if (!data.id) {
            returnData.errCode = -1;
            returnData.message = "not found id";
            resolve(returnData);
        } else {
            try {
                let user = await db.Users.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender === '1' ? true : false,
                    email: data.email,
                    address: data.address,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                }, { where: { id: data.id } });
                if (user[0] === 0) {
                    returnData.errCode = 9;
                    returnData.message = 'not found user to edit';
                    resolve(returnData);
                }
                if (user[0] === 1) {
                    returnData.errCode = 0;
                    returnData.message = "edit ok";
                    returnData.user = user;
                } resolve(returnData);
            } catch (e) {
                console.log(e);
                returnData.errCode = 8;
                returnData.message = e;
            }
        }
    })

}

const deleteUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        let returnData = {};
        if (!data.id) {
            returnData.errCode = -1;
            returnData.message = "missing id";
            resolve(returnData);
        }
        try {
            let user = await db.Users.destroy({
                where: { id: data.id }
            })
            if (user === 1) {
                returnData.errCode = 0;
                returnData.message = "delete ok";
            }
            if (user === 0) {
                returnData.errCode = 10;
                returnData.message = "not found user to delete";
            }
            resolve(returnData);
        } catch (e) {
            console.log(e);
            returnData.errCode = 10;
            returnData.message = e;
            reject(returnData);
        }
    })
}
module.exports = {
    getAllUsers: getAllUsers,
    get1User: get1User,
    createNewUserService: createNewUserService,
    editUserService: editUserService,
    deleteUserService: deleteUserService,
}