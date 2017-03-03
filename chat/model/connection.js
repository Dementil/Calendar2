var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'calendar'
});


// var text = {
// 	list: function (callback) {
// 		connection.query('SELECT * FROM events', callback);
// 	},


// 	add: function (text, callback) {
// 		connection.query('INSERT INTO events SET ?', answer, callback);
// 	}
// };

exports.end = function () {
	connection.end();
}



module.exports = connection;



