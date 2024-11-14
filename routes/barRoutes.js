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

module.exports = router;
