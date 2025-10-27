const usuarioModelo = require('../modelos/usuario');
const { validationResult } = require('express-validator');

exports.Listar = async (req, res) => {
    const lista = await usuarioModelo.findAll();
    res.json(lista);
};
exports.Buscar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const data = errores.array().map(i => ({
            atributo: i.path,
            msj: i.msg
        }));
        return res.status(400).json({ msj: 'Hay errores', data: data });
    }
    const { id } = req.query;
    try {
        const usuarioEncontrado = await usuarioModelo.findByPk(id);
        if (!usuarioEncontrado) {
            return res.status(404).json({ msj: 'Usuario no encontrado' });
        }
        res.json(usuarioEncontrado);
    }
    catch (er) {
        console.error(er);
        res.status(500).json({ msj: 'Error al buscar el usuario' });
    }
};

exports.Guardar = async (req, res) => { 
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const data = errores.array().map(i => ({
            atributo: i.path,
            msj: i.msg
        }));
        return res.status(400).json({ msj: 'Hay errores', data: data });
    }
    const { nombre, email, contrasena, estado, rolId } = req.body;
    try {
        const nuevoUsuario = await usuarioModelo.create({
            nombre: nombre,
            email: email,
            contrasena: contrasena,
            estado: estado,
            rolId: rolId
        });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al guardar el usuario' });
    }
};

exports.Actualizar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const data = errores.array().map(i => ({
            atributo: i.path,
            msj: i.msg
        }));
        return res.status(400).json({ msj: 'Hay errores', data: data });
    }
    const { id, nombre, email, contrasena, estado, rolId } = req.body;
    try {
        const usuarioEncontrado = await usuarioModelo.findByPk(id);
        if (!usuarioEncontrado) {
            return res.status(404).json({ msj: 'Usuario no encontrado' });
        }
        usuarioEncontrado.nombre = nombre;
        usuarioEncontrado.email = email;
        usuarioEncontrado.contrasena = contrasena;
        usuarioEncontrado.estado = estado;
        usuarioEncontrado.rolId = rolId;
        await usuarioEncontrado.save();
        res.json(usuarioEncontrado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al actualizar el usuario' });
    }
};
exports.Eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const data = errores.array().map(i => ({
            atributo: i.path,
            msj: i.msg
        }));
        return res.status(400).json({ msj: 'Hay errores', data: data });
    }
    const { id } = req.query;
    try {
        const usuarioEncontrado = await usuarioModelo.findByPk(id);
        if (!usuarioEncontrado) {
            return res.status(404).json({ msj: 'Usuario no encontrado' });
        }
        await usuarioEncontrado.destroy();
        res.json({ msj: 'Usuario eliminado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al eliminar el usuario' });
    }
};