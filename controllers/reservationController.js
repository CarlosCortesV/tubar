const sql = require('mssql'); // Configuración para SQL Server

// Listar todas las reservas
async function getAllReservations(req, res) {
  try {
    const result = await sql.query('SELECT * FROM Reservas');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al listar las reservas:', error);
    res.status(500).json({ message: 'Error al listar las reservas', error });
  }
}

// Crear una nueva reserva
async function createReservation(req, res) {
  const { userId, barId, date, status } = req.body;

  try {
    await sql.query(`
      INSERT INTO Reservas (userId, barId, date, status)
      VALUES ('${userId}', '${barId}', '${date}', '${status}')
    `);
    res.status(201).json({ message: 'Reserva creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
}

// Actualizar una reserva existente
async function updateReservation(req, res) {
  const { id } = req.params;
  const { userId, barId, date, status } = req.body;

  try {
    await sql.query(`
      UPDATE Reservas
      SET userId = '${userId}', barId = '${barId}', date = '${date}', status = '${status}'
      WHERE id = ${id}
    `);
    res.status(200).json({ message: 'Reserva actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
}

// Eliminar una reserva
async function deleteReservation(req, res) {
  const { id } = req.params;

  try {
    await sql.query(`
      DELETE FROM Reservas
      WHERE id = ${id}
    `);
    res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
}

module.exports = {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
