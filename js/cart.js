var fs = require('fs');
var ejs = require('ejs');
var $items = $('#items');
var Cart_one_item = ejs.compile(fs.readFileSync('./templates/cart_item.ejs', "utf8"));

$(function () {
    updateCart();
    $('.btn-order').click(function () {
        document.location.href = '../html/order.html';
    });
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.item').animate({width: "89%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.item').animate({width: "75%"}, 500);
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

function setCart(Cart) {
    var cart_name = 'cart' + get('id');
    set(cart_name, Cart);
}

function removeFromCart(item) {
    var Cart = getCart();
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].id_goods === item.id_goods) {
            var x = Cart.indexOf(Cart[i]);
            Cart.splice(x, 1);
            setCart(Cart);
        }
    }
}

function lowCart(item) {
    var Cart = getCart();
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].id_goods === item.id_goods) {
            Cart[i].quantity = Cart[i].quantity - 1;
            setCart(Cart);
        }
    }
}

function upCart(item) {
    var Cart = getCart();
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].id_goods === item.id_goods) {
            Cart[i].quantity = Cart[i].quantity + 1;
            setCart(Cart);
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

    showSum();
    showQuantity();
    var Cart = getCart();
    Cart.forEach(showOneItem);
}

function showSum() {
    var Cart = getCart();
    var sum = 0;
    for (var i = 0; i < Cart.length; i++) {
        sum += Cart[i].quantity * Cart[i].price;
    }
    if (sum === 0) {
        $('.btn-order').css('pointer-events', 'none');
        $('.for-order').css('cursor', 'not-allowed');
    } else {
        $('.btn-order').css('pointer-events', 'all');
        $('.for-order').css('cursor', 'auto');
    }
    $('#sum').html(sum + '$');
}

function showQuantity() {
    var Cart = getCart();
    var quantity = 0;
    for (var i = 0; i < Cart.length; i++) {
        quantity += Cart[i].quantity;
    }
    $('.quantity').html(quantity);
}