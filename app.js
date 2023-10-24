const express = require('express');
const sqlite3 = require('sqlite3');
var cors = require('cors')
const app = express();
const port = 3012;

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Middleware to parse JSON request body
app.use(cors())
app.use(express.json())

app.get('/seats', (req, res) => {
  db.all('SELECT * FROM seats', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/seats/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM seats WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Seat not found' });
      return;
    }

    res.json(row);
  });
});



app.put('/seats/:id/available', (req, res) => {
  const { id } = req.params;

  db.run('UPDATE seats SET status = "available" WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ message: 'Seat status updated from sold to available' });
  });
});



// Update seat status from booked to solid

app.put('/seats/:id', (req, res) => {
  const { id } = req.params;

  db.run('UPDATE seats SET status = "sold" WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ message: 'Seat status updated from booked to sold' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
