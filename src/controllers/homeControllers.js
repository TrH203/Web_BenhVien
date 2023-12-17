import db from "../models/index";
import CRUD from "../services/crudService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll();
        console.log(data);
        console.log("--------------");
        return res.render("homepage.ejs", { "data": JSON.stringify(data) })
    } catch (e) {
        console.log(e);
    }
}
let getAboutUs = (req, res) => {
    return res.render("test/about.ejs");
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let createUserStatus = await CRUD.createNewService(req.body);
    return res.send(createUserStatus);
}


module.exports = {
    getHomePage: getHomePage,
    getAboutUs: getAboutUs,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}