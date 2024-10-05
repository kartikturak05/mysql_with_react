const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use admin routes
app.use('/api', adminRoutes);

// Default route
app.get('/', (req, res) => {
    console.log("Default route");
    res.send("Welcome to the API!");
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
