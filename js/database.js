var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "bdproject",
    password: "passbd123",
    database: "BDProject"
});


function checkEmail(data, callback) {
    var sql = "SELECT email FROM CLIENT";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            var find = false;
            for (var i = 0; i < res.length; i++) {
                if (res[i].email === data) find = true;
            }
            callback(null, find);
        }
    });
}

function register(data, callback) {
    var sql = "INSERT INTO CLIENT (name, surname, email, password, phone_number) VALUES ('" + data.name + "', '" + data.surname + "', '" + data.email + "', '" + data.password + "', '" + data.phone + "')";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
}

function newAdmin(data, callback) {
    var sql = "INSERT INTO ADMIN (id_admin, surname, name, password) VALUES ('" + data.id_admin + "', '" + data.surname + "', '" + data.name + "', '" + data.password + "')";
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
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
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
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

function checkGoodsId(data, callback) {
    var sql = "SELECT id_goods FROM GOODS";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            var find = false;
            for (var i = 0; i < res.length; i++) {
                if (res[i].id_goods === data) find = true;
            }
            callback(null, find);
        }
    });
}

function addToGoods(data, callback) {
    var sql = "INSERT INTO GOODS (id_goods, model, characteristics, memory, color, guarantee, price, image, quantity) VALUES (" + data.id_goods + ", '" + data.model +"', '" + data.characteristics + "', " + data.memory + ", '" + data.color + "', '" + data.guarantee + "', " + data.price + ", '" + data.img + "', " + data.quantity + ");";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    })
}

function order(data, callback) {
    var sql = "INSERT INTO ORDERS (time_placed, time_delivered, sum_order, status, address, client_id) VALUES ('" + data.time_placed + "', '" + data.time_delivered + "', " + data.sum_order + ", '" + data.status + "', '" + data.address + "', " + data.client_id + ");";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    })
}

function addToOrdersGood(data, callback) {
    for (var i = 0; i < data.length; i++) {
        var sql = "INSERT INTO ORDERS_GOODS (id_order, id_goods, quantity, sum_order) VALUES (" + data[i].id_order + ", " + data[i].id_goods + ", " + data[i].quantity + ", " + data[i].sum_order + ");";
        var count = 0;
        con.query(sql, function (err, res) {
            if (err) {
                callback(err, null);
            } else {
                count++;
                if (count === i) callback(null, true);
            }
        });
    }
}

function selectAll(callback) {
    var sql = "SELECT * FROM GOODS";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}

function calculateSum(data, callback) {}

function getIdClient(data, callback) {
    var sql = "SELECT client_id FROM CLIENT WHERE email = '" + data + "'";
    con.query(sql, function (err, res) {
        if (err) {
          callback(err, null);
        } else {
            callback(null, res[0].client_id);
        }
    })
}

function changePassword(data, callback) {
    var sql = "UPDATE CLIENT SET password = '" + data.password + "' WHERE email = '" + data.email + "'";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    })
}

function takeInfoClient(data, callback) {
    var sql = "SELECT * FROM CLIENT WHERE client_id = '" + data + "'";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            if (res !== undefined) callback(null, res);
        }
    })
}

function findOrderId(data, callback) {
    var sql = "SELECT order_id FROM ORDERS WHERE time_placed = '" + data.time_placed + "' AND client_id = '" + data.client_id + "'";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res[0].order_id);
        }
    })
}

function getOrders(callback) {
    var sql = "SELECT * FROM ORDERS";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}

function changeStatus(data, callback) {
    var sql = "UPDATE ORDERS SET status = '" + data.status + "' WHERE order_id = " + data.id_order + ";"
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            sql = "UPDATE ORDERS SET admin_id = " + data.admin_id + " WHERE order_id = " + data.id_order + ";";
            con.query(sql, function (err, res) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, true);
                }
            })
        }
    })
}

function showOneItem(callback) {
    var sql = "SELECT order_id, model, ORDERS_GOODS.quantity FROM ORDERS INNER JOIN(GOODS INNER JOIN ORDERS_GOODS ON GOODS.id_goods = ORDERS_GOODS.id_goods) ON ORDERS.order_id = ORDERS_GOODS.id_order;";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}

function statsAdmin(callback) {
    var sql = "SELECT ORDERS.admin_id, SUM(ORDERS_GOODS.quantity) AS sum FROM ORDERS INNER JOIN (GOODS INNER JOIN ORDERS_GOODS ON GOODS.id_goods = ORDERS_GOODS.id_goods) ON ORDERS.order_id = ORDERS_GOODS.id_order WHERE time_placed >= '2018-06-01' GROUP BY ORDERS.admin_id;";
    con.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}