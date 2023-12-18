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

let displayCRUD = async (req, res) => {
    try {
        let data = await CRUD.getUserService();
        return res.render("getCRUD.ejs", { 'data': data });
    } catch (e) {
        console.log(e);
    }
}

let editCRUD = async (req, res) => {
    let data = await CRUD.get1UserService(req.query.id);
    if (data) {
        return res.render("editCRUD.ejs", { "data": data });
    } else {
        return res.render("notFound.ejs");
    }
}

let deleteCRUD = async (req, res) => {
    try {
        let status = await CRUD.delete1UserService(req.query.id);
        if (status) {
            return res.send("delete succeed");
        }
        else {
            return res.render("notFound.ejs");
        }
    } catch (e) {
        throw e;
    }

}

let updateCRUD = (req, res) => {
    CRUD.update1UserService(req.body);
    return res.render("updateCRUD.ejs");
}


module.exports = {
    getHomePage: getHomePage,
    getAboutUs: getAboutUs,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    deleteCRUD: deleteCRUD,
    updateCRUD: updateCRUD,
}