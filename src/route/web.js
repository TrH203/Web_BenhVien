import express from "express";
import homeControllers from "../controllers/homeControllers";
import userControllers from "../controllers/userControllers";
import adminControllers from "../controllers/adminControllers";
let router = express.Router(); // use Router in Express

let initWebRoutes = (app) => { //1 server == 1 application

    router.get("/", homeControllers.getHomePage);

    router.get("/about", homeControllers.getAboutUs);

    router.get('/crud', homeControllers.getCRUD);

    router.post("/post-crud", homeControllers.postCRUD)

    router.get("/get-crud", homeControllers.displayCRUD)

    router.get("/edit-crud", homeControllers.editCRUD);

    router.post("/update-crud", homeControllers.updateCRUD);

    router.get("/delete-crud", homeControllers.deleteCRUD);

    // connect Frontend - Backend
    router.post("/api/login", userControllers.handleLogin);

    router.get("/api/crud", adminControllers.handleGetUser);

    router.post("/api/create-new-user", adminControllers.handleCreateNewUser);

    router.put("/api/edit-user", adminControllers.handleEditUser);

    router.delete("/api/delete-user", adminControllers.handleDeleteUser);

    //Allcode api (get code from allcode table)
    router.get("/api/get-code", userControllers.handleGetCode);

    return app.use("/", router); // web app start with /(HOMEPAGE))
}

module.exports = initWebRoutes;