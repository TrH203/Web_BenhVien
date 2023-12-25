import Service from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) { // if (email === undefined || email === "") {
        return res.status(200).json({
            errCode: 1,
            message: "Missing value",
            user: {},
        })
    }
    let userData = await Service.handleUserLogin(email, password);
    userData.user = userData.user ? userData.user : {} // if userData.user is none => userData.user = {}
    if (userData.errCode === 1) {
        return res.status(200).json(userData);
    }
    else {
        return res.status(200).json(userData);
    }
}

module.exports = {
    handleLogin: handleLogin,
}