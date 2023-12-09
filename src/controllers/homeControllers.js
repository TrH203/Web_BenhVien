import db from "../models/index";

let getHomePage = async (req, res) => {
    try{
        let data = await db.Users.findAll();
        console.log(data);
        console.log("--------------");
        return res.render("homepage.ejs",{"data":JSON.stringify(data)})
    }catch(e){
        console.log(e);
    }
}
let getAboutUs = (req, res) => {
    return res.render("test/about.ejs");
}


module.exports = {
    getHomePage: getHomePage,
    getAboutUs: getAboutUs,
}