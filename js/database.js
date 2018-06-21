var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "bdproject",
    password: "passbd123",
    database: "BDProject"
});


function checkEmail(data, callback) {
    var sql = "SELECT email FROM CLIENT";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            var find = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].email === data) find = true;
            }
            callback(null, find);
        }
    });
}

function register(data, callback) {
    var sql = "INSERT INTO CLIENT (name, surname, email, password, phone_number) VALUES ('"+data.name+"', '"+data.surname+"', '"+data.email+"', '"+data.password+"', '"+data.phone+"')";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
}

function login(data, callback) {
    var sql = "SELECT password FROM CLIENT WHERE email = '" + data + "'";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            if (res[0] !== undefined) {
                callback(null, res[0].password);
            } else {
                callback(null, 0);
            }
        }
    })
}

function loginAdmin(data, callback) {
    var sql = "SELECT password FROM ADMIN WHERE id_admin = '" + data + "'";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            if (res[0] !== undefined) {
                callback(null, res[0].password);
            } else {
                callback(null, 0);
            }
        }
    })
}

function find(data, callback) {
    var sql = "SELECT * FROM GOODS WHERE model LIKE '%" + data + "%'";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

function filter(data, callback) {
    var sql = "SELECT * FROM GOODS";
    var min = data.min;
    var max = data.max;
    var memory = data.memory;
    var color = data.color;
    if (min !== "" || max !== "" || memory.length !== 0 || color.length !== 0) {
        sql += " WHERE "
    }
    if (min !== "") {
        sql += "price >= " + min + " ";
    }
    if (max !== "") {
        if (min !== "") {
            sql += "AND price <= " + max + " ";
        } else {
            sql += "price <= " + max + " ";
        }
    }
    if (memory.length !== 0) {
        if (min !== "" || max !== "") {
            sql += "AND (memory = " + memory[0] + " ";
        } else {
            sql += "(memory = " + memory[0] + " ";
        }
        for (var i = 1; i < memory.length; i++) {
            sql += "OR memory = " + memory[i] + " ";
        }
        sql += ") ";
    }
    if (color.length !== 0) {
        if (min !== "" || max !== "" || memory.length !== 0) {
            sql += "AND (color = '" + color[0] + "' ";
        } else {
            sql += "(color = '" + color[0] + "' ";
        }
        for (var i = 1; i < color.length; i++) {
            sql+= "OR color = '" + color[i] + "' ";
        }
        sql += ")";
    }
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

function checkGoodsId(data, callback) {
    var sql = "SELECT id_goods FROM GOODS";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            var find = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].id_goods === data) find = true;
            }
            callback(null, find);
        }
    });
}

function addToGoods(data, callback) {
    var sql = "INSERT INTO GOODS (id_goods, model, characteristics, memory, color, guarantee, price, image) VALUES (" + data.id_goods + ", '" + data.model +"', '" + data.characteristics + "', " + data.memory + ", '" + data.color + "', '" + data.guarantee + "', " + data.price + ", '" + data.img + "');";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    })
}

function selectAll(callback) {
    var sql = "SELECT * FROM GOODS";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

function calculateSum(data, callback) {

}