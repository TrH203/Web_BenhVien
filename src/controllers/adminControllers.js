import CRUD from "../services/adminService";

const handleGetUser = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            let Users = await CRUD.getAllUsers();
            setTimeout(() => { return res.status(200).json(Users); }, 500);
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
    setTimeout(() => {
        return res.status(200).json(sendApi)
    }, 1000)
}

const handleEditUser = async (req, res) => {
    let data = req.body;
    let sendApi = await CRUD.editUserService(data);
    return res.status(200).json(sendApi);
}
const handleDeleteUser = async (req, res) => {
    let data = req.body;
    let sendApi = await CRUD.deleteUserService(data);
    setTimeout(() => { return res.status(200).json(sendApi) }, 500);
}

module.exports = {
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}