const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3306;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nqteuute_cake_website',
    password: '59520Rose!',
    database: 'nqteuute_cake_website'
});

// API endpoint to get cake data
app.get('/api/cakes', (req, res) => {
    db.query('SELECT * FROM cakes', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
