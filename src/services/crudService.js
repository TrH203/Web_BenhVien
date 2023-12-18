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
            address: data.address + ", " + data.city,
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
module.exports = {
    createNewService: createNewService,
    getUserService: getUserService,
}