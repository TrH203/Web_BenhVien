const {Sequelize, Model} = require("sequelize"); // import library

// Option 3: passing parameters

const sequelize = new Sequelize("hiendatabase", "root" , null, {
    host: 'localhost',
    dialect: 'mysql'
});

let test_connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been establish successfully");
    } catch (error){
        console.error("Unable to connect to the database: ", error);
    }
}

module.exports = test_connectDB;