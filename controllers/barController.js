// barController.js
const { sql } = require('../config/dbConfig');

async function getBares(req, res) {
  try {
    const result = await sql.query('SELECT * FROM Bares');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bars', error });
  }
}

async function createBar(req, res) {
  const { name, location, description } = req.body;
  try {
    await sql.query(`INSERT INTO Bares (name, location, description) VALUES ('${name}', '${location}', '${description}')`);
    res.status(201).json({ message: 'Bar created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating bar', error });
  }
}
async function updateBar(req, res) {
    const { id } = req.params;
    const { name, location, description } = req.body;
  
    try {
      // Validar que el ID y los datos de entrada existan
      if (!id || !name || !location || !description) {
        return res.status(400).json({ message: 'Faltan datos para actualizar el bar.' });
      }
  
      // Ejecutar la consulta de actualización en la base de datos
      await sql.query(`
        UPDATE Bares
        SET name = '${name}', location = '${location}', description = '${description}'
        WHERE id = ${id}
      `);
  
      res.status(200).json({ message: 'Bar actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el bar:', error);
      res.status(500).json({ message: 'Error al actualizar el bar', error });
    }
  }
// Eliminar un bar de la base de datos
async function deleteBar(req, res) {
    const { id } = req.params;
  
    try {
      // Validar que el ID exista
      if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID para eliminar el bar.' });
      }
  
      // Ejecutar la consulta de eliminación en la base de datos
      await sql.query(`
        DELETE FROM Bares
        WHERE id = ${id}
      `);
  
      res.status(200).json({ message: 'Bar eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el bar:', error);
      res.status(500).json({ message: 'Error al eliminar el bar', error });
    }
  }
module.exports = { getBares, createBar, updateBar, deleteBar };
