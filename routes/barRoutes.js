// routes/barRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

router.get('/', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT id_bar, nombre_bar, ubicación, teléfono, email_contacto, descripción, horario_apertura, horario_cierre, capacidad_maxima FROM bar');
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

module.exports = router;
