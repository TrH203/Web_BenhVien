import express from "express";
import homeControllers from "../controllers/homeControllers";
let router = express.Router(); // use Router in Express

let initWebRoutes = (app) => { //1 server == 1 application

    router.get("/", homeControllers.getHomePage);

    router.get("/AboutUs", homeControllers.getAboutUs);

    return app.use("/", router); // web app start with /(HOMEPAGE))
}

module.exports = initWebRoutes;