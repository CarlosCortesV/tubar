const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

// Endpoint para insertar reservas
router.post('/insertar', async (req, res) => {
    const { id_bar,id_usuario,id_mesa, fecha_reserva, hora_reserva, numero_personas } = req.body;

    console.log("Datos recibidos en el backend:", req.body);

    if (!id_bar || !id_usuario || !id_mesa || !fecha_reserva || !hora_reserva || !numero_personas) {
        console.error("Faltan campos obligatorios.");
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    // Continuar con la lógica original
    const estado_reserva = "Pendiente";

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_bar', sql.Int, id_bar)
            .input('id_mesa', sql.Int, id_mesa)
            .input('fecha_reserva', sql.Date, fecha_reserva)
            .input('hora_reserva', sql.Time, hora_reserva)
            .input('numero_personas', sql.Int, numero_personas)
            .input('estado_reserva', sql.VarChar(20), estado_reserva)
            .query(`
                INSERT INTO Reserva (id_usuario, id_bar, id_mesa, fecha_reserva, hora_reserva, numero_personas, estado_reserva)
                VALUES (@id_usuario, @id_bar, @id_mesa, @fecha_reserva, @hora_reserva, @numero_personas, @estado_reserva)
            `);

        res.status(201).json({ message: "Reserva creada con éxito", reservaId: result.recordset[0]?.id_reserva || null });
    } catch (error) {
        res.status(500).json(console.log("Gracias"));
    }
});


module.exports = router;

