const express = require('express');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/comments', commentRoutes);

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Comment Service is running on port ${PORT}`);
});
