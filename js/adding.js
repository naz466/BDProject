var img;
$(function () {
    $('#img').on('change', readFile);
});

$('.more-menu').click(function () {
    var left = document.getElementById('left');
    if (left.offsetWidth > 0) {
        $('.left-menu').animate({width: "0"}, 500, function () {
            $('.left-menu').hide();
        });
        $('.find').animate({width: "72%"}, 500);
        $('.item').animate({width: "85%"}, 500);
        $('.adding-container').animate({width: "89%"}, 500);
        $('.more-menu').animate({left: "0"}, 500);
    } else {
        $('.left-menu').show();
        $('.left-menu').animate({width: "15%"}, 500);
        $('.find').animate({width: "58%"}, 500);
        $('.item').animate({width: "71%"}, 500);
        $('.adding-container').animate({width: "75%"}, 500);
        $('.more-menu').animate({left: "15%"}, 500);
    }
});

$('.catalog').click(function () {
    document.location.href = '../html/catalog.html'
});

$('.orders').click(function () {

});

$('.adding').click(function () {
    document.location.href = '../html/adding.html'
});

$('.log-out').click(function () {
    document.location.href = '../html/main.html'
});

$('.add').click(function () {
    var id_goods = $('.id-goods').val();
    var model = $('.model').val();
    var price = $('.price').val();
    var characteristics = $('.characteristics').val();
    var memory = $('.memory').val();
    var color = $('.color').val();
    var guarantee = $('.guarantee').val();

    if (validationInfo(id_goods, model, price, characteristics, img)) {
        checkGoodsId(id_goods, function (err, res) {
           if (!err && !res) {
               var data = {
                   id_goods: id_goods,
                   model: model,
                   price: price,
                   characteristics: characteristics,
                   memory: memory,
                   color: color,
                   img: img,
                   guarantee: guarantee
               };
               addToGoods(data, function (err, res) {
                   $('.for-id-goods.form-group').removeClass('has-error');
                   $('#helpIdGoods2').css('display', 'none');
                   if (!err && res) document.location.href = '../html/catalog.html';
               });
           }
           if (!err && res) {
               $('.for-id-goods.form-group').addClass('has-error');
               $('#helpIdGoods2').css('display', 'block');
           }
        });
    }
});


function validationInfo(id_goods, model, price, characteristics, img) {
    var valid = true;
    if (id_goods.length === 0) {
        $('.for-id-goods.form-group').addClass('has-error');
        $('#helpIdGoods').css('display', 'block');
        $('#helpIdGoods2').css('display', 'none');
        valid = false;
    } else {
        $('.for-id-goods.form-group').removeClass('has-error');
        $('#helpIdGoods1').css('display', 'none');
        $('#helpIdGoods2').css('display', 'none');
    }
    if (model.length === 0) {
        $('.for-model.form-group').addClass('has-error');
        $('#helpName').css('display', 'block');
        valid = false;
    } else {
        $('.for-model.form-group').removeClass('has-error');
        $('#helpName').css('display', 'none');
    }
    if (price.length === 0) {
        $('.for-price.form-group').addClass('has-error');
        $('#helpPrice').css('display', 'block');
        valid = false;
    } else {
        $('.for-price.form-group').removeClass('has-error');
        $('#helpPrice').css('display', 'none');
    }
    if (img === undefined) {
        $('#helpImage').css('display', 'block');
        valid = false;
    } else {
        $('#helpImage').css('display', 'none');
    }
    if (characteristics.length === 0) {
        $('.for-characteristics.form-group').addClass('has-error');
        $('#helpCharacteristics').css('display', 'block');
        valid = false;
    } else {
        $('.for-characteristics.form-group').removeClass('has-error');
        $('#helpCharacteristics').css('display', 'none');
    }
    return valid;
}

function readFile() {
    if (this.files && this.files[0]) {
        var fr = new FileReader();
        fr.addEventListener('load', function (ev) {
            img = ev.target.result;
        });
        fr.readAsDataURL(this.files[0]);
    }
}