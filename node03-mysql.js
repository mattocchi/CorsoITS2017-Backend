"use strict";

// caricamento sincrono del modulo mysql (e dipendenze)
var mysql = require("mysql");

// creo la connessione
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'mysql'
});
// apro la connesione
connection.connect();

// eseguiamo una query
connection.query("SELECT * FROM user", function(err, rows, fields) {
    // codice eseguito al completamento della query
    if (err)
        throw err;
    for (var i in rows) {
        var row = rows[i];
        console.log(row.User);
    }
});

// chiudo la connessione
connection.end();