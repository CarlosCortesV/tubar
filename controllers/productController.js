const sql = require('mssql'); // Configuración para SQL Server

// Listar todos los productos
async function getAllProducts(req, res) {
  try {
    const result = await sql.query('SELECT * FROM Productos');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al listar los productos:', error);
    res.status(500).json({ message: 'Error al listar los productos', error });
  }
}

// Crear un nuevo producto
async function createProduct(req, res) {
  const { name, description, price, category } = req.body;

  try {
    await sql.query(`
      INSERT INTO Productos (name, description, price, category)
      VALUES ('${name}', '${description}', '${price}', '${category}')
    `);
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
}

// Actualizar un producto existente
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    await sql.query(`
      UPDATE Productos
      SET name = '${name}', description = '${description}', price = '${price}', category = '${category}'
      WHERE id = ${id}
    `);
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await sql.query(`
      DELETE FROM Productos
      WHERE id = ${id}
    `);
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
