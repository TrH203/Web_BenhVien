import express from "express";


// let is local variables
let configViewEngine = (app) => {
    //arrow function
    app.use(express.static("./src/public")); // allow app use file image,.. in .src/public
    app.set("view engine", "ejs"); // use ejs library for view engine
    app.set("views", "./src/views") // code view in views/ only

}

module.exports = configViewEngine; // export for all file out there can use this function