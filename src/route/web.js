import express from "express";
import homeControllers from "../controllers/homeControllers";
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

    return app.use("/", router); // web app start with /(HOMEPAGE))
}

module.exports = initWebRoutes;