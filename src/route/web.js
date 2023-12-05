import express from "express";
import homeControllers from "../controllers/homeControllers";
let router = express.Router(); // use Router in Express

let initWebRoutes = (app) => { //1 server == 1 application
    
    router.get("/", homeControllers.getHomePage);

    router.get("/aboutus", homeControllers.getaboutus);

    return app.use("/", router); // web app start with /(trang chu)
}

module.exports = initWebRoutes;