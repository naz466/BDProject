var fs = require('fs');
var ejs = require('ejs');
var $items = $('#items');
var Goods_one_item = ejs.compile(fs.readFileSync('./templates/goods.ejs', "utf8"));

$(function () {
    var type = get('type');
    if (type === 'client') {
        $('.orders').css('display', 'none');
        $('.adding').css('display', 'none');
        $('.statistics_admin').css('display', 'none');
        var email = get('email');
        getIdClient(email, function (err, res) {
            if (!err) {
                set('id', res);
                showQuantity();
            }
        })
    } else {
        $('.cart').css('display', 'none');
        $('.cabinet').css('display', 'none');
    }
    var goods = [];
    selectAll(function (err, res) {
        if (!err) {
            for (var i = 0; i < res.length; i++) {
                var a = {
                    id_goods: res[i].id_goods,
                    model: res[i].model,
                    characteristics: res[i].characteristics,
                    memory: res[i].memory,
                    color: res[i].color,
                    guarantee: res[i].guarantee,
                    price: res[i].price,
                    img: res[i].image,
                    quantity: 1
                };
                goods.push(a);
            }
            showItems(goods);
        }
    });
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.find').animate({width: "72%"}, 500);
        $('.item').animate({width: "85%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.find').animate({width: "58%"}, 500);
        $('.item').animate({width: "71%"}, 500);
        $('.more-menu').animate({left: "15%"}, 500);
    }
});

$('.catalog').click(function () {
    document.location.href = '../html/catalog.html'
});

$('.cart').click(function () {
    document.location.href = '../html/cart.html'
});

$('.orders').click(function () {
    document.location.href = '../html/orders_admin.html'
});

$('.cabinet').click(function () {

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

$('.btn-find').click(function () {
    var text = $('.find').val();
    var goods = [];
    if (text !== "") {
        find(text, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                var a = {
                    id_goods: res[i].id_goods,
                    model: res[i].model,
                    characteristics: res[i].characteristics,
                    memory: res[i].memory,
                    color: res[i].color,
                    guarantee: res[i].guarantee,
                    price: res[i].price,
                    img: res[i].image,
                    quantity: 1
                };
                goods.push(a);
            }
            showItems(goods);
        });
    }
});

$('.btn-filter').click(function () {
    var from = $('.for-from').val();
    var to = $('.for-to').val();
    var memory = [];
    var color = [];
    if ($('#16').prop('checked')) {
        memory.push(16);
    }
    if ($('#32').prop('checked')) {
        memory.push(32);
    }
    if ($('#64').prop('checked')) {
        memory.push(64);
    }
    if ($('#1e').prop('checked')) {
        memory.push(128);
    }
    if ($('#2s').prop('checked')) {
        memory.push(258);
    }
    if ($('#white').prop('checked')) {
        color.push('white');
    }
    if ($('#black').prop('checked')) {
        color.push('black');
    }
    if ($('#silver').prop('checked')) {
        color.push('silver');
    }
    if ($('#gold').prop('checked')) {
        color.push('gold');
    }
    if ($('#red').prop('checked')) {
        color.push('red');
    }
    var data = {
        min: from,
        max: to,
        memory: memory,
        color: color
    };
    var goods = [];
    filter(data, function (err, res) {
        if (!err) {
            for (var i = 0; i < res.length; i++) {
                var a = {
                    id_goods: res[i].id_goods,
                    model: res[i].model,
                    characteristics: res[i].characteristics,
                    memory: res[i].memory,
                    color: res[i].color,
                    guarantee: res[i].guarantee,
                    price: res[i].price,
                    img: res[i].image,
                    quantity: 1
                };
                goods.push(a);
            }
            showItems(goods);
        }
    });
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

function setCart(Cart) {
    var cart_name = 'cart' + get('id');
    set(cart_name, Cart);
}

function addToCart(item) {
    var Cart = getCart();
    var find = false;
    for (var i = 0; i < Cart.length; i++) {
        if (item.id_goods === Cart[i].id_goods) {
            var count = Cart[i].quantity;
            Cart[i].quantity = count + 1;
            find = true;
            setCart(Cart);
            break;
        }
    }
    if (!find) {
        Cart.push(item);
        setCart(Cart);
    }
}

function showItems(list) {
    $items.html("");

    function showOneItem(item) {
        var html_code = Goods_one_item({item: item});
        var $node = $(html_code);
        $node.find('.btn-buy').click(function () {
            addToCart(item);
            showQuantity();
        });
        $items.append($node);
    }
    list.forEach(showOneItem);
}

function showQuantity() {
    var Cart = getCart();
    var quantity = 0;
    for (var i = 0; i < Cart.length; i++) {
        quantity += Cart[i].quantity;
    }
    $('.quantity').html(quantity);
}