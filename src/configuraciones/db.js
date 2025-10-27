const sequelize = require('sequelize');
const{UsuarioBD,ContrasenaBD,NombreBD}=process.env;
const db = new sequelize(
    NombreBD,
    UsuarioBD,
    ContrasenaBD,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
);
module.exports=db;