const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/dbConfig');
const path = require('path');
const sql = require('mssql');
const app = express();

// Configuración de la sesión
app.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambia a true si usas HTTPS
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Conexión a la base de datos
connectDB();

// Middleware de autenticación
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // Si está autenticado, pasa al siguiente middleware
  }
  res.status(401).json({ error: 'No autenticado' });
}

// Endpoints de rutas API
const barRoutes = require('./routes/barRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/bares', barRoutes);
app.use('/api/bares/crear', barRoutes);
app.use('/api/reservas', reservationRoutes);

// Inicio del servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Rutas públicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'profile.html'));
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await sql.connect(connectDB);
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password) // Usa hashing en producción
      .query(
        'SELECT id_usuario, nombre_usuario FROM Usuario WHERE nombre_usuario = @username AND contraseña = @password'
      );

    if (result.recordset.length > 0) {
      req.session.user = {
        id: result.recordset[0].id_usuario,
        username: result.recordset[0].nombre_usuario,
      };
      res.status(200).json({ message: 'Login exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta protegida para obtener información del usuario
app.get('/profile-data', isAuthenticated, async (req, res) => {
  try {
    const pool = await sql.connect(connectDB);
    const result = await pool
      .request()
      .input('userId', sql.Int, req.session.user.id)
      .query(
        'SELECT nombre_usuario, correo, teléfono FROM Usuario WHERE id_usuario = @userId'
      );

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({
        username: user.nombre_usuario,
        id: req.session.user.id,
        email: user.correo,
        phone: user.teléfono
      });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta de logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
    }
    res.clearCookie('connect.sid'); // Limpia la cookie de la sesión
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });
});

