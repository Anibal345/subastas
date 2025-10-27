const db = require('../configuraciones/db');
const { DataTypes } = require('sequelize');
const rol = db.define(
    'rol',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC',
        },
    },  
    {
        tableName: 'rol',
    }
);

module.exports = rol;
