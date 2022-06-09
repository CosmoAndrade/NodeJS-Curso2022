const Sequelize = require("sequelize");


const connection = new Sequelize('tela-login', 'root' , '',{
    host:'localhost',
    dialect:'mysql'
});



module.exports = connection;