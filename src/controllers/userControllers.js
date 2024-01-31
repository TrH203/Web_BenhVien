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

let handleGetCode = async (req, res) => {
    let type = req.query.type;
    if (!type) {
        return res.status(200).json({
            errCode: -1,
            message: "missing value",
            code: []
        })
    }
    setTimeout(async () => {
        const rs = await Service.getCode(type);
        if (Object.keys(rs).length !== 0) {
            return res.status(200).json({
                errCode: 0,
                message: "ok",
                code: rs
            })
        }
        else {
            return res.status(200).json({
                errCode: -1,
                message: "fail"
            })
        }
    }, 2000);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetCode: handleGetCode,
}