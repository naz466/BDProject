var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "mrk13",
    password: "pass123"
});

con.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});