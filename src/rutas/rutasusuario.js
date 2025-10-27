const { Router } = require('express');
const controladorusuario = require('../controladores/controladorusuario');
const { body, query } = require('express-validator');
const modelousuario = require('../modelos/usuario');
const rutas = Router();
/**
 * @swagger
 * /usuario/listar:
 *   get:
 *     summary: Listar usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno del servidor
 */
rutas.get('/listar', controladorusuario.Listar);

/**
 * @swagger
 * /usuario/buscar:
 *   get:
 *     summary: Buscar un usuario por ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
rutas.get('/buscar', controladorusuario.Buscar);
/**
 * @swagger
 * /usuario/guardar:
 *   post:
 *     summary: Guardar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               estado:
 *                 type: string
 *               rolId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Errores de validación
 *       500:
 *         description: Error interno del servidor
 */
rutas.post('/guardar', controladorusuario.Guardar);
/**
 * @swagger
 * /usuario/actualizar:
 *   put:
 *     summary: Actualizar un usuario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               estado:
 *                 type: string
 *               rolId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Errores de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
rutas.put('/actualizar', controladorusuario.Actualizar);
/**
 * @swagger
 * /usuario/eliminar:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
rutas.delete('/eliminar', controladorusuario.Eliminar); 

module.exports = rutas;