// routes/barRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

router.get('/', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT id_bar, nombre_bar, ubicación, teléfono, email_contacto, descripción, horario_apertura, horario_cierre, capacidad_maxima,imagen_url FROM Bar');
        res.json(result.recordset); // Envía los datos de los bares en formato JSON
    } catch (err) {
        res.status(500).send('Error al obtener los bares');
    }
});
// Endpoint para crear un nuevo bar
router.post('/crear', async (req, res) => {
    const {
      nombre_bar,
      ubicación,
      teléfono,
      email_contacto,
      descripción,
      horario_apertura,
      horario_cierre,
      capacidad_maxima,
    } = req.body;
  
    try {
      let pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input('nombre_bar', sql.VarChar(100), nombre_bar)
        .input('ubicación', sql.VarChar(255), ubicación)
        .input('teléfono', sql.VarChar(15), teléfono)
        .input('email_contacto', sql.VarChar(100), email_contacto)
        .input('descripción', sql.Text, descripción)

        .input('capacidad_maxima', sql.Int, capacidad_maxima)
        .query(
          `INSERT INTO Bar 
          (nombre_bar, ubicación, teléfono, email_contacto, descripción, horario_apertura, horario_cierre, capacidad_maxima)
          VALUES (@nombre_bar, @ubicación, @teléfono, @email_contacto, @descripción, '18:00', '18:00', @capacidad_maxima)`
        );
  
      res.status(201).json({ message: 'Bar creado con éxito' });
      console.log("Bar creado con éxito")
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al guardar el bar en la base de datos' });
    }
  });
  router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let pool = await sql.connect(dbConfig);
        await pool
            .request()
            .input('id_bar', sql.Int, id)
            .query('DELETE FROM Bar WHERE id_bar = @id_bar');

        res.status(200).json({ message: 'Bar eliminado con éxito' });
        console.log("Bar eliminado con éxito");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el bar' });
    }
});
router.put('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const {
        nombre_bar,
        ubicación,
        teléfono,
        email_contacto,
        descripción,
        horario_apertura,
        horario_cierre,
        capacidad_maxima,
    } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('id_bar', sql.Int, id)
            .input('nombre_bar', sql.VarChar(100), nombre_bar)
            .input('ubicación', sql.VarChar(255), ubicación)
            .input('teléfono', sql.VarChar(15), teléfono)
            .input('email_contacto', sql.VarChar(100), email_contacto)
            .input('descripción', sql.Text, descripción)
            .input('capacidad_maxima', sql.Int, capacidad_maxima)
            .query(
                `UPDATE Bar
                 SET nombre_bar = @nombre_bar, 
                     ubicación = @ubicación, 
                     teléfono = @teléfono, 
                     email_contacto = @email_contacto, 
                     descripción = @descripción,
                     horario_apertura = '18:00', 
                     horario_cierre = '18:00', 
                     capacidad_maxima = @capacidad_maxima
                 WHERE id_bar = @id_bar`
            );

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Bar actualizado con éxito' });
        } else {
            res.status(404).json({ message: 'Bar no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el bar' });
    }
});
module.exports = router;
