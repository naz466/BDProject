var fs = require('fs');
var ejs = require('ejs');
var $items = $('#items');

var Cart_one_item = ejs.compile(fs.readFileSync('./templates/cart_item.ejs', "utf8"));

$(function () {
    updateCart();
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.item').animate({width: "89%"}, 500);
        $('.total-container').animate({width: "89%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.item').animate({width: "75%"}, 500);
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

function genSum() {
    var Cart = getCart();
    var sum = 0;
    for (var i = 0; i < Cart.length; i++) {
        var a = Cart[i].quantity * Cart[i].price;
        sum += a;
    }
    return sum;
}

function getCart() {
    var a = get('cart');
    if (a !== undefined && a !== null) {
        return a;
    } else {
        a = [];
        return a;
    }
}

function removeFromCart(item) {
    var a = get('cart');
    if (a !== undefined) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id_goods === item.id_goods) {
                var x = a.indexOf(a[i]);
                a.splice(x, 1);
                set('cart', a);
            }
        }
    }
}

function lowCart(item) {
    var a = get('cart');
    if (a !== undefined) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id_goods === item.id_goods) {
                a[i].quantity = a[i].quantity - 1;
                set('cart', a);
            }
        }
    }
}

function upCart(item) {
    var a = get('cart');
    if (a !== undefined) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id_goods === item.id_goods) {
                a[i].quantity = a[i].quantity + 1;
                set('cart', a);
            }
        }
    }
}

function updateCart() {
    $items.html("");

    function showOneItem(item) {
        var html_code = Cart_one_item({item: item});
        var $node = $(html_code);
        $node.find('.btn-remove').click(function () {
            if (item.quantity === 1) {
                $node.remove();
                removeFromCart(item);
                updateCart();
            } else {
                lowCart(item);
                updateCart();
            }
        });
        $node.find('.btn-add').click(function () {
           item.quality = item.quality + 1;
           upCart(item);
           updateCart();
        });
        $($node).find('.btn-delete').click(function () {
            removeFromCart(item);
            updateCart();
        });
        $items.append($node);
    }

    var sum = genSum();
    $('#sum').html(sum);
    var Cart = getCart();
    Cart.forEach(showOneItem);
}