const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/dbConfig');
const path = require('path');

const app = express();
app.use(bodyParser.json());

connectDB();
const barRoutes = require('./routes/barRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Usa las rutas de API
app.use('/api/bares', barRoutes);
app.use('/api/reservas', reservationRoutes);
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Import routes
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
});