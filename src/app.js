const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./configuraciones/db');
const ModeloRol = require('./modelos/rol');
const rutasRol = require('./rutas/rutasrol');
const ModeloUsuario = require('./modelos/usuario');
const rutasusuario = require('./rutas/rutasusuario');
const rutasvehiculo = require('./rutas/rutasvehiculo');
const app = express();

db.authenticate().then(async () => {
	console.log('Conectado a la base de datos');
    ModeloRol.hasMany(ModeloUsuario, { foreignKey: 'rolId' });
    ModeloUsuario.belongsTo(ModeloRol, { foreignKey: 'rolId' });
	await ModeloRol.sync()
		.then(() => console.log('Modelo rol creado correctamente'))
		.catch((er) => console.error(er));
    await ModeloUsuario.sync()
		.then(() => console.log('Modelo usuario creado correctamente'))
		.catch((er) => console.error(er));
	await ModeloVehiculo.sync()
		.then(() => console.log('Modelo vehiculo creado correctamente'))
		.catch((er) => console.error(er));
}).catch((er) => {
	console.error('Error conectando a la base de datos:', er);
});

app.set('port', process.env.PORT || 3002);
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/roles', rutasRol);
app.use('/api/usuarios', rutasusuario);
app.use('/api/vehiculos', rutasvehiculo);
app.listen(app.get('port'), () => {
	console.log('Servidor iniciado en el puerto', app.get('port'));
});

