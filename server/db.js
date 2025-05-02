const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8897925715', // your mysql password
    database: 'delicios'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
    } else {
        console.log('✅ MySQL Connected!');
    }
});

module.exports = db;
