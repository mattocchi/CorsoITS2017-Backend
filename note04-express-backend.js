/**
 * EXPRESS Framework web veloce per Node.js
 * http://expressjs.com/it/
 * npm install express --save
 * 
 * BODY-PARSER Parse incoming request bodies in a middleware before your handlers
 * https://github.com/expressjs/body-parser
 * npm install body-parser
 * 
 */

'use strict';

// http://justindavis.co/2015/08/31/CORS-in-Express/

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//var allowCrossDomain = function (req, res, next) {
//    console.log("allowCrossDomain: " + req.method);
//    if ('OPTIONS' == req.method) {
//        res.header('Access-Control-Allow-Origin', '*');
//        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//        res.sendStatus(200);
//    } else {
//// if (res.get("Authorization")) {
//// // TODO: verifica se un tocken valido
////            
//// } else {
//// res.sendStatus(401); // 401 Unauthorized
//// }
//        next();
//    }
//};
//app.use(allowCrossDomain);

//// parse application/json
app.use(bodyParser.json());
//// app.use(bodyParser.urlencoded());
//
//app.use(function (req, res, next) {
//    console.log("req.body=" + req.body); // populated!
//    next();
//});

////parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))
//// parse an HTML body into a string
//app.use(bodyParser.text({ type: 'text/html' }))

var port = 3000;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'catalogo'
});

app.get('/prodotti', function (req, res) {
    //res.header('Access-Control-Allow-Origin', '*');
    
	// var query = "SELECT id, descrizione, IF(1 = completato, 'true', 'false')
	// as completato from todos";
    
	var query = "SELECT * from prodotti;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        /*
		 * for (var i in rows) { console.log(rows[i].nome) }
		 */
        console.log('rows.length= ' + rows.length);
        /*
		 * var dataRes = JSON.stringify(rows); res.send(dataRes);
		 */
        res.json(rows);
    });
});

//
//app.get('api/v1/prodotti/:id', function (req, res) {
//    console.log(req.params.id);
//    var query = "SELECT * prodotti WHERE id = ?;";
//    console.log(query);
//    connection.query(query, [req.params.id], function (err, rows, fields) {
//        if (err)
//            throw err;
//        res.json(rows[0]);
//    });
//});


// TEST: curl -X POST http://localhost:3000
app.post('/prodotti', function (req, res) {
    // res.header('Access-Control-Allow-Origin', '*');
    console.log("req.body=", req.body);
    console.log("req.params=", req.params);
    var query = "INSERT INTO prodotti (descrizione, categoria, prezzo, disponibile) VALUES (?,?,?,?);";
    console.log(query);
    connection.query(query, [req.body.descrizione, req.body.categoria, req.body.prezzo, (req.body.disponibile) ? 1 : 0, req.params.id], function (err, result) {
        if (err)
            throw err;
        console.log(result.insertId);
        // res.json(result);
        var query = "SELECT * from prodotti WHERE id = ?;";
        console.log(query);
        connection.query(query, result.insertId, function (err, rows, fields) {
            if (err)
                throw err;
            res.json(rows[0]);
        });
    });
});


//app.put('/prodotti/:id', function (req, res) {
//    res.header('Access-Control-Allow-Origin', '*');
//    // req.accepts('application/json');
//
//    // req.accepts('application/json');
//    // => "application/json"
//
//    // res.header('Access-Control-Allow-Origin', '*');
//    console.log("req.body=", req.body);
//    console.log("req.params=", req.params);
//
//    var query = "UPDATE todos SET descrizione = ?, completato = ? WHERE id = ?;";
//    console.log(query);
//    connection.query(query, [req.body.descrizione, (req.body.completato) ? 1 : 0, req.params.id], function (err, result) {
//        if (err)
//            throw err;
//        console.log('changed ' + result.changedRows + ' rows');
//        // var dataRes = JSON.stringify(rows);
//        res.json(result);
//    });
//
//    // res.json(req.body);
//});
//
//app.delete('/todos/:id', function (req, res) {
//    res.header('Access-Control-Allow-Origin', '*');
//    console.log("req.body=", req.body);
//    console.log("req.params=", req.params);
//    var query = "DELETE from todos WHERE id = ?;";
//    console.log(query);
//    connection.query(query, req.params.id, function (err, result) {
//        if (err)
//            throw err;
//        console.log('deleted ' + result.affectedRows + ' rows');
//        res.json(result);
//    });
//});

// pubblicazione via web server dei files html nella cartella public
app.use('/app', express.static('public'));

console.log('Connecting to MySQL...');
connection.connect();
console.log('Connected');

app.listen(port, function () {
    console.log('Prodotti app listening on port 3000!');
    console.log("http://localhost:" + port);
});

process.on('exit', function () {
    console.log('Disconnecting from MySQL...');
    connection.end();
    console.log('Disconnected');
});
