const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectTimeout: 20000,
});

connection.connect(err => {
    if (err) {
        console.log('Error in connecting to DB ----->>>>>', err);
    }
    else {
        console.log('Successfully Connected To DB');
    }
});

module.exports = connection;