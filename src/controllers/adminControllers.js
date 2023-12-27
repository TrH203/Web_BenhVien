import CRUD from "../services/adminService";

const handleGetUser = async (req, res) => {
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

const handleCreateNewUser = async (req, res) => {
    let data = req.body;
    console.log(data);
    let sendApi = await CRUD.createNewUserService(data);
    return res.status(200).json(sendApi);
}

const handleEditUser = async (req, res) => {
    let data = req.body;
    let sendApi = await CRUD.editUserService(data);
    return res.status(200).json(sendApi);
}
const handleDeleteUser = async (req, res) => {
    let data = req.body;
    let sendApi = await CRUD.deleteUserService(data);
    return res.status(200).json(sendApi);
}

module.exports = {
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}