import CRUD from "../services/adminService";

const getUser = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            let Users = await CRUD.getAllUsers();
            return res.status(200).json(Users);
        }
        else {
            let User = await CRUD.get1User(id);
            return res.status(200).json(User);
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = {
    getUser: getUser,
}