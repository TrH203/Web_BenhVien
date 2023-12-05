
let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
}
let getaboutus = (req, res) => {
    return res.render("test/about.ejs");
}


module.exports = {
    getHomePage: getHomePage,
    getaboutus: getaboutus,
}