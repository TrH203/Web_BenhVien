import db, { sequelize } from "../models/index";
import bcrypt from "bcrypt";
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}; // for return value
            let isExist = await checkUserEmail(email);

            if (isExist) {
                // user exist
                let cpPasswordData = await compareUserPassword(email, password);
                userData.errCode = cpPasswordData.errCode;
                userData.message = cpPasswordData.message;
                userData.user = cpPasswordData.user;
                resolve(userData);
            }
            else {
                // user doesn't exist
                userData.errCode = 1;
                userData.message = "not found user's email";
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: userEmail },
            });
            if (user === null) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let compareUserPassword = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let returnData = {}; // user will return {} when not found user
            let user = await db.Users.findOne({
                where: { email: userEmail },
                raw: true
            })
            if (user === null) {
                returnData.errCode = 2;
                returnData.message = "not found user's email"; // this error will handle many user login in the same moment
            }
            else {
                let check = bcrypt.compareSync(userPassword, user.password);
                if (check) {
                    returnData.errCode = 0;
                    returnData.message = "ok";
                    delete user.password;
                    returnData.user = user;
                }
                else {
                    returnData.errCode = 3;
                    returnData.message = "wrong password";
                }
            }
            resolve(returnData);
        } catch (e) {
            reject(e);
        }
    })
}
let getCode = async (type) => {
    try {
        const projects = await sequelize.query(`Select * from allcode where type = '${type.toUpperCase()}';`,
            {
                model: db,
                mapToModel: true,
            });
        return projects;
    } catch (e) {
        console.log(e);
        return {}
    }
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         let projects = await sequelize.query(`Select * from allcode where type = '${type.toUpperCase()}';`,
    //             {
    //                 model: db,
    //                 mapToModel: true,
    //             });
    //         resolve(projects);
    //     } catch (e) {
    //         console.log(e);
    //         reject({
    //             errCode: 15,
    //             message: e,
    //             data: []
    //         })
    //     }
    // })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getCode: getCode,
}