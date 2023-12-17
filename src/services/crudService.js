import bcrypt from "bcrypt";



let createNewService = async (data) => {
    let passwordHashed = await hashPassword(data.password);
    console.log("Data from crudService");
    console.log(data);
    console.log(passwordHashed);
}

let hashPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10); // get Salt (how to hash)
        let hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        return e;
    }
}

module.exports = {
    createNewService: createNewService,
}