const db = require('../configuraciones/db');
const { DataTypes } = require('sequelize');
const role = require('./rol');

const usuario = db.define(
    'Usuario',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: 'usuarios',
        timestamps: true
    }
);

usuario.belongsTo(role, { foreignKey: 'rolId' });
role.hasMany(usuario, { foreignKey: 'rolId' });

module.exports = usuario;
