const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/dbConfig');
const path = require('path');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
const barRoutes = require('./routes/barRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

connectDB();
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
// Usa las rutas de API
app.use('/api/bares', barRoutes);
app.use('/api/reservas', reservationRoutes);
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Cambia a true si usas HTTPS
}));

// Import routes
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
});
app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/src/public/profile.html');
});
// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const pool = await sql.connect(connectDB);
      const result = await pool.request()
          .input('username', sql.VarChar, username)
          .input('password', sql.VarChar, password) // Usa hashing en producción
          .query('SELECT * FROM Usuario WHERE nombre_usuario = @username AND contraseña = @password');

      if (result.recordset.length > 0) {
          res.status(200).send('Login exitoso');
      } else {
          res.status(401).send('Credenciales inválidas');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
  }
});
app.get('/profile', (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ error: 'No autenticado' });
  }

  // Si está autenticado, muestra los datos del usuario
  res.json({
      username: req.session.user.username,
      id: req.session.user.id,
  });
});