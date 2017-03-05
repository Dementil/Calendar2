var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var express = require('express');
var mysql = require('mysql');
var routes = require('./routes/index');
var mustacheExpress = require('mustache-express');
var path = require('path');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var connection = require('./model/connection');
var fs = require('fs');



app.use('/', routes);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index');
});


connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});


// Получение данных из формы через ajax
app.post("/", jsonParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	response.json(request.body);
	var answer = request.body;
	connection.query('INSERT INTO events SET ?', answer,
		function (error, rows, fields) {
			if (error) throw error;
		})
});


io.on('connection', function (socket) {
	socket.on('getEvents', function (data) {
		connection.query('SELECT * FROM events', function (err, rows, fields) {
			if (err) throw err;
			//console.log(rows);
			socket.emit("newEvent", rows);
		});
	});
});


server.listen(port);
console.log('Listening on port ' + port);