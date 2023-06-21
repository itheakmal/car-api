const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes');
const db = require('./Models');

const app = express();
db.sync();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/', routes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});