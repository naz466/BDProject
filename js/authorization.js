var crypt = require('crypto');
var email;
var password;

function signIn() {
    email = $('.log-email').val();
    password = $('.log-password').val();

    email = email.toLowerCase();

    if (validationSignIn(email, password)) {
        password = sha1(password);
        login(email, function (err, res) {
            if (!err) {
                if (res === 0) {
                    $('.log-form-email.form-group').addClass('has-error');
                    $('#helpEmail').css('display', 'block');
                } else {
                    $('.log-form-email.form-group').removeClass('has-error');
                    $('#helpEmail').css('display', 'none');
                    if (password === res) {
                        $('.log-form-password.form-group').removeClass('has-error');
                        $('#helpPassword').css('display', 'none');
                        set('type', 'client');
                        set('email', email);
                        document.location.href = '../html/catalog.html';
                    } else {
                        $('.log-form-password.form-group').addClass('has-error');
                        $('#helpPassword').css('display', 'block');
                    }
                }
            }
        });
    }
}

function validationSignIn(email, password) {
    var valid = true;
    if (email.length === 0) {
        $('.log-form-email.form-group').addClass('has-error');
        $('#helpEmail').css('display', 'block');
        valid = false;
    } else {
        $('.log-form-email.form-group').removeClass('has-error');
        $('#helpEmail').css('display', 'none');
    }
    if (password.length < 6) {
        $('.log-form-password.form-group').addClass('has-error');
        $('#helpPassword').css('display', 'block');
        valid = false;
    } else {
        $('.log-form-password.form-group').removeClass('has-error');
        $('#helpPassword').css('display', 'none');
    }
    return valid;
}

function sha1(string) {
    var sha1 = crypt.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}