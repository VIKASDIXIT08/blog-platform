const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
});
