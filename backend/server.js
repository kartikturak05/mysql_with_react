const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'testDB'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.get('/',(req,res)=>{
    console.log("default route");
})
// POST route to validate user
app.post('/api/validate', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
