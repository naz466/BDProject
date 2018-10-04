var fs = require('fs');
var ejs = require('ejs');
var $items = $('#items');
var $info = $('#info');
var Order_one_item = ejs.compile(fs.readFileSync('./templates/order_item.ejs', "utf8"));
var Order_sum = ejs.compile(fs.readFileSync('./templates/order_sum.ejs', "utf8"));
var User_info = ejs.compile(fs.readFileSync('./templates/user_info.ejs', "utf8"));

$(function () {
    var id = get('id');
    takeInfoClient(id, function (err, res) {
        if (!err) {
            set('surname', res[0].surname);
            set('name', res[0].name);
            set('email', res[0].email);
            set('phone', res[0].phone_number);
            var surname = get('surname');
            var name = get('name');
            var email = get('email');
            var phone = get('phone');
            var info = {
                surname: surname,
                name: name,
                phone: phone,
                email: email
            };
            var Cart = getCart();
            var items = [];
            for (var i = 0; i < Cart.length; i++) {
                var item = {
                    id_goods: Cart[i].id_goods,
                    model: Cart[i].model,
                    price: Cart[i].price,
                    quantity: Cart[i].quantity,
                    counter: i + 1
                };
                items.push(item);
            }
            var sum = {
                sum: takeSum()
            };
            var html_code = User_info({info: info});
            var $node = $(html_code);
            var address = $node.find('.post-office').val();
            showQuantity();
            showUserInfo(info);
            showCheck(items);
            showSum(sum);
            $('.btn-order').click(function () {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                month = month+1;
                var time_placed = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                day = day + 3;
                var time_delivered = year + "-" + month + "-" + day;
                var data = {
                    sum_order: takeSum(),
                    status: 'pending',
                    address: address,
                    client_id: id,
                    time_placed: time_placed,
                    time_delivered: time_delivered
                };
                order(data, function (err, res) {
                    if (!err && res) {
                        data = {
                            time_placed: time_placed,
                            client_id: id
                        };
                        findOrderId(data, function (err, res) {
                            if (!err) {
                                var order_id = res;
                                var goods = [];
                                for (var i = 0; i < Cart.length; i++) {
                                    var sum_order = Cart[i].price * Cart[i].quantity;
                                    data = {
                                        id_order: order_id,
                                        id_goods: Cart[i].id_goods,
                                        quantity: Cart[i].quantity,
                                        sum_order: sum_order
                                    };
                                    goods.push(data);
                                }
                                addToOrdersGood(goods, function (err, res) {
                                    if (!err && res) {
                                        var new_cart = [];
                                        var name_cart = 'cart' + get('id');
                                        set(name_cart, new_cart);
                                        alert('Your order is accepted successfully');
                                        document.location.href = '../html/catalog.html';
                                    }
                                });
                            }
                        })
                    }
                })
            });
        }
    });
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.items').animate({width: "89%"}, 500);
        $('.info-order').animate({width: "89%"}, 500);
        $('.for-order').animate({width: "89%"}, 500);
        $('.total-container').animate({width: "89%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.items').animate({width: "75%"}, 500);
        $('.info-order').animate({width: "75%"}, 500);
        $('.for-order').animate({width: "75%"}, 500);
        $('.total-container').animate({width: "75%"}, 500);
        $('.more-menu').animate({left: "15%"}, 500);
    }
});

$('.catalog').click(function () {
    document.location.href = '../html/catalog.html'
});

$('.cart').click(function () {
    document.location.href = '../html/cart.html'
});

$('.log-out').click(function () {
    document.location.href = '../html/main.html'
});

function getCart() {
    var cart_name = 'cart' + get('id');
    var a = get(cart_name);
    if (a !== undefined && a !== null) {
        return a;
    } else {
        a = [];
        return a;
    }
}

function showUserInfo(info) {
    $info.html('');
    var html_code = User_info({info: info});
    var $node = $(html_code);
    $info.append($node);
}

function showCheck(list) {
    $items.html('');

    function showOneItem(item) {
        var html_code = Order_one_item({item: item});
        var $node = $(html_code);
        $items.append($node);
    }
    list.forEach(showOneItem);
}

function showSum(sum) {
    var html_code = Order_sum({sum: sum});
    var $node = $(html_code);
    $items.append($node);
}

function takeSum() {
    var Cart = getCart();
    var sum = 0;
    for (var i = 0; i < Cart.length; i++) {
        sum += Cart[i].quantity * Cart[i].price;
    }
    return sum;
}

function showQuantity() {
    var Cart = getCart();
    var quantity = 0;
    for (var i = 0; i < Cart.length; i++) {
        quantity += Cart[i].quantity;
    }
    $('.quantity').html(quantity);
}