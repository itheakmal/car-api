const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes');
const db = require('./Models');
require('dotenv').config();

const app = express();
db.sync();
// Configure cors options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your desired URL
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/', routes);
// Error handling 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  });

// Start the server on port 3000
app.listen(process.env.CARS_PORT, () => {
    console.log(`Server started on port ${process.env.CARS_PORT}`);
});