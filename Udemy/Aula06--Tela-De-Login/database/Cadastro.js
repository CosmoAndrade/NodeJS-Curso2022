const Sequelize = require('sequelize');
const connection = require('./database');

const Cadastro = connection.define('cadastros',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

Cadastro.sync({force: false}).then(()=>{
    console.log('Tabela criada')
});


module.exports = Cadastro;
