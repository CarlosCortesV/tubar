const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

router.post('/insertar', async (req, res) => {
    const { id_bar, id_mesa, fecha_reserva, hora_reserva, numero_personas } = req.body;
    const estado_reserva = "Pendiente"; // Puedes ajustar esto según tu lógica
    const id_usuario = req.session.userId; // Asegúrate de que el middleware de sesión esté configurado correctamente

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_bar', sql.Int, id_bar)
            .input('id_mesa', sql.Int, id_mesa)
            .input('numero_personas', sql.Int, numero_personas)
            .input('estado_reserva', sql.VarChar(20), estado_reserva)
            .query(`
                INSERT INTO Reserva (id_usuario, id_bar, id_mesa, fecha_reserva, hora_reserva, numero_personas, estado_reserva)
                VALUES (@id_usuario, @id_bar, @id_mesa, '2024-09-01', '19:00:00', @numero_personas, @estado_reserva)
            `);

        res.status(201).json({ message: "Reserva creada con éxito", reservaId: result.recordset[0]?.id_reserva || null });
    } catch (error) {
        console.error("Error al insertar la reserva:", error);
        res.status(500).json({ error: "Error al insertar la reserva" });
    }
});

module.exports = router;
