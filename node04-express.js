/**
 * EXPRESS Framework web veloce per Node.js
 * http://expressjs.com/it/
 * npm install express --save
 */
'use strict';

var mysql = require('mysql');
var express = require('express');

var app = express();

const port = "3000";

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'catalogo'
});
console.log('Connecting to MySQL...');
connection.connect();
console.log('Connected');

app.get("/prodotti", function(request, response) {
    var query = "SELECT * from prodotti;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
        if (err) throw err;
        console.log('rows.length= ' + rows.length);
        // in risposta ritorno le rows in formato JSON
        response.json(rows);
    });
});

// espone risorse statiche della cartella /public in URL /app
app.use('/app', express.static('public'));

app.listen(port, function () {
    console.log("Express App in ascolto su porta " + port);
});

// chiudiamo la connection solo in fase di chiusura del processo
process.on('exit', function () {
    console.log('Disconnecting from MySQL...');
    connection.end();
    console.log('Disconnected');    
});
