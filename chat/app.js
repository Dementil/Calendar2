var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

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
connection.connect();

app.use('/', routes);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index');
});

var answer;

// получение данных из формы через POST запрос
app.route('/adminform')
	.get(function (req, res) {
		res.render('adminform', {
		})
	})
	.post(function (req, res) {
		answer = req.body;

		connection.query('INSERT INTO events SET ?', answer,
			function (error, answer, fields) {
				if (error) throw error;
			});

		connection.query('SELECT * FROM events',
			function (err, answer, fields) {
				if (answer.length === 0)
					res.redirect('/');
			});

		res.redirect('/');
		res.end();
	});


io.on('connection', function (socket) {
	socket.emit("newEvent", answer);
});



server.listen(port);
console.log('Listening on port ' + port);