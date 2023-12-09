import express from "express";
import bodyParser from "body-parser"; // use to parse URL to get input
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import test_connectDB from "./config/connectDB";
require('dotenv').config(); // to use process.env

let app = express();

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app); // tell server all route in app

test_connectDB(); // test data whenever run page either homepage or other pages.

let port = process.env.PORT || 6969; // if port === undefined => port6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on port" + port)
})