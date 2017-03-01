var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'calendar'
});

// connection.query(
// 	INSERT INTO events (id_grp, dt_start, dt_end, name, color) VALUES 
// 	(answer.id_grp, answer.dt_start, answer.dt_end, answer.name, answer.color),
// 	function (error, results, fields) 
// 	{
// 		if (error) throw error;
// 	});

exports.end = function () {
	connection.end();
}

module.exports = connection;


