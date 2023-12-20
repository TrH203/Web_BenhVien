import bcrypt from "bcrypt";
import db from "../models/index"


let createNewService = async (data) => {
    try {
        let passwordHashed = await hashPassword(data.password);
        await db.Users.create({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender === '1' ? true : false,
            email: data.email,
            password: passwordHashed,
            address: data.address,
            roleId: data.role,
            phoneNumber: data.phoneNumber,
        })
        return "Create user succeed";
    } catch (e) {
        throw e;
    }
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

let getUserService = async () => {
    try {
        let data = await db.Users.findAll({
            raw: true, // show data more clearly
        });
        return data;
    } catch (e) {
        throw e;
    }
}
let get1UserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Users.findByPk(id, {
                raw: true
            })
            if (data) {
                resolve(data);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let delete1UserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let status = await db.Users.destroy({
                where: {
                    id: id,
                }
            })
            resolve(
                updateDataTable()
            );
        } catch (e) {
            reject(e)
        }
    })
}

let update1UserService = async (id, data) => {
    try {
        let status = await db.Users.update(data, {
            where: {
                id: id,
            }
        })
        return updateDataTable();
    } catch (e) {
        throw e;
    }
}

let updateDataTable = async () => {
    try {
        let returnData = await db.Users.findAll();
        return returnData;
    } catch (e) {
        throw e;
    }
}
module.exports = {
    createNewService: createNewService,
    getUserService: getUserService,
    get1UserService: get1UserService,
    delete1UserService: delete1UserService,
    update1UserService: update1UserService,
}