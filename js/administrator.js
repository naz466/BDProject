var crypt = require('crypto');
var id;
var pass;

$(function () {
    $('.log-id').keydown(function (e) {
        if (e.keyCode === 13) log();
    });
    $('.log-pass').keydown(function (e) {
        if (e.keyCode === 13) log();
    });
});

function log() {
    id = $('.log-id').val();
    pass = $('.log-pass').val();
    if (validationLog(id, pass)) {
        pass = sha1(pass);
        loginAdmin(id, function (err, res) {
            if (!err) {
                if (res === 0) {
                    $('.log-form-id.form-group').addClass('has-error');
                    $('#helpId').css('display', 'block');
                } else {
                    $('.log-form-id.form-group').removeClass('has-error');
                    $('#helpId').css('display', 'none');
                    if (pass === res) {
                        $('.log-form-pass.form-group').removeClass('has-error');
                        $('#helpPass').css('display', 'none');
                        set('type', 'admin');
                        set('id', id);
                        document.location.href = '../html/catalog.html';
                    } else {
                        $('.log-form-pass.form-group').addClass('has-error');
                        $('#helpPass').css('display', 'block');
                    }
                }
            }
        });
    }
}

function validationLog(id, pass) {
    var valid = true;
    if (id.length === 0) {
        $('.log-form-id.form-group').addClass('has-error');
        $('#helpId').css('display', 'block');
        valid = false;
    } else {
        $('.log-form-id.form-group').removeClass('has-error');
        $('#helpId').css('display', 'none');
    }
    if (pass.length < 6) {
        $('.log-form-pass.form-group').addClass('has-error');
        $('#helpPass').css('display', 'block');
        valid = false;
    } else {
        $('.log-form-pass.form-group').removeClass('has-error');
        $('#helpPass').css('display', 'none');
    }
    return valid;
}

function log2() {
    var password = 'password';
    password = sha1(password);
    var data = {
        id_admin: 'id',
        surname: 'surname',
        name: 'name',
        password: password
    };
    newAdmin(data, function (err, res) {
        if (!err && res) console.log('Added new admin.');
    })
}

function sha1(string) {
    var sha1 = crypt.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}