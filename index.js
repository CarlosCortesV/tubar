const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./config/dbConfig');

const app = express();
app.use(bodyParser.json());

connectToDatabase();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
