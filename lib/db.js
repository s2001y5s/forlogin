
var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dus123',
    database:'study'
  });
  
  db.connect();
  module.exports = db;