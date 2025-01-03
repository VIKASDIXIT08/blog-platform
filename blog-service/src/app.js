const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/blogs', blogRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Blog Service is running on port ${PORT}`);
});
