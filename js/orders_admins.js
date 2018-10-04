var fs = require('fs');
var ejs = require('ejs');
var $items = $('#items');
var Admin_order_one_item = ejs.compile(fs.readFileSync('./templates/order_admin_one_item.ejs', "utf8"));
var One_item_chek = ejs.compile(fs.readFileSync('./templates/one_item_check.ejs', "utf8"));

$(function () {
    var goods = [];
    getOrders(function (err, res) {
        if (!err) {
            for (var i = 0; i < res.length; i++) {
                var a = {
                    id_order: res[i].order_id,
                    time_placed: res[i].time_placed,
                    sum_order: res[i].sum_order,
                    status: res[i].status
                };
                goods.push(a);
            }
            showOrders(goods);
        }
    })
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.find').animate({width: "72%"}, 500);
        $('.items-container').animate({width: "89%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.find').animate({width: "58%"}, 500);
        $('.items-container').animate({width: "75%"}, 500);
        $('.more-menu').animate({left: "15%"}, 500);
    }
});

function showOrders(list) {
    $items.html('');

    function showOneItemOrder(item) {
        var html_code = Admin_order_one_item({order: item});
        var $node = $(html_code);
        showOneItem(function (err, res) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].order_id === item.id_order) {
                        var a = {
                            name: res[i].model,
                            quantity: res[i].quantity
                        };
                        var htm_code2 = One_item_chek({item: a});
                        var $node2 = $(htm_code2);
                        $node.find('.items-in-check').append($node2);
                    }
                }
            }
        });
        $node.find('.change-status').click(function () {
            var status = $node.find('.status').val();
            var order_id = item.id_order;
            var id = get('id');
            var a = {
                status: status,
                id_order: order_id,
                admin_id: id
            };
            changeStatus(a, function (err, res) {
                if (!err && res) document.location.href = '../html/orders_admin.html'
            })
        });
        $items.append($node);
    }
    list.forEach(showOneItemOrder);
}

$('.catalog').click(function () {
    document.location.href = '../html/catalog.html'
});

$('.orders').click(function () {
   document.location.href = '../html/orders_admin.html'
});

$('.adding').click(function () {
    document.location.href = '../html/adding.html'
});

$('.statistics_admin').click(function () {
    document.location.href = '../html/statisticsAdmin.html'
});

$('.log-out').click(function () {
    document.location.href = '../html/main.html'
});