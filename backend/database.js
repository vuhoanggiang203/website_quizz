const mysql = require('mysql'); 
 
var connection = mysql.createConnection({
    host : 'localhost' , 
    database : 'db_myproject_1',
    user : 'root' , 
    password : ''
});
module.exports = connection ; 