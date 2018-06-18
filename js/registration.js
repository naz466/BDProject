var surname;
var name;
var email;
var password;
var password2;
var phone;
var mailer = require('nodemailer');

function signUp() {
    surname = $('.reg-surname').val();
    name = $('.reg-name').val();
    email = $('.reg-email').val();
    password = $('.reg-password').val();
    password2 = $('.reg-password2').val();
    phone = $('.reg-phone').val();

    if (validationSignUp(surname, name, email, password, password2, phone)) {
        var key = generateKey();
        confirmEmail(email, key);
    }
}

function validationSignUp(surname, name, email, password, password2, phone) {
    var valid = true;
    if (surname.length === 0) {
        $('.reg-form-surname.form-group').addClass('has-error');
        $('#helpNewSurname').css('display', 'block');
        valid = false;
    } else {
        $('.reg-form-surname.form-group').removeClass('has-error');
        $('#helpNewSurname').css('display', 'none');
    }
    if (name.length === 0) {
        $('.reg-form-name.form-group').addClass('has-error');
        $('#helpNewName').css('display', 'block');
        valid = false;
    } else {
        $('.reg-form-name.form-group').removeClass('has-error');
        $('#helpNewName').css('display', 'none');
    }
    if (email.length === 0) {
        $('.reg-form-email.form-group').addClass('has-error');
        $('#helpNewEmail').css('display', 'block');
        valid = false;
    } else {
        if (!validEmail(email)) {
            $('.reg-form-email.form-group').addClass('has-error');
            $('#helpNewEmail').css('display', 'block');
            valid = false;
        } else {
            $('.reg-form-email.form-group').removeClass('has-error');
            $('#helpNewEmail').css('display', 'none');
        }
    }
    if (password.length < 6) {
        $('.reg-form-password.form-group').addClass('has-error');
        $('#helpNewPassword').css('display', 'block');
        valid = false;
    } else {
        $('.reg-form-password.form-group').removeClass('has-error');
        $('#helpNewPassword').css('display', 'none');
    }
    if (password2.length < 6 || !confirmPassword(password, password2)) {
        $('.reg-form-password2.form-group').addClass('has-error');
        $('#helpNewPassword2').css('display', 'block');
        valid = false;
    } else {
        $('.reg-form-password2.form-group').removeClass('has-error');
        $('#helpNewPassword2').css('display', 'none');
    }
    if (phone.length === 0) {
        $('.reg-form-phone.form-group').addClass('has-error');
        $('#helpNewPhone').css('display', 'block');
        valid = false;
    } else {
        if (!validPhone(phone)) {
            $('.reg-form-phone.form-group').addClass('has-error');
            $('#helpNewPhone').css('display', 'block');
            valid = false;
        } else {
            $('.reg-form-phone.form-group').removeClass('has-error');
            $('#helpNewPhone').css('display', 'none');
        }
    }
    return valid;
}

function validEmail(email) {
    var reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return reg.test(email);
}

function validPhone(phone) {
    var reg = /^([0]?)+\d{9}$/;
    return reg.test(phone);
}

function confirmPassword(password, password2) {
    return password === password2;
}

function confirmEmail(email, key) {
    var success = false;
    var smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "on.shop.storeline@gmail.com",
            pass: "on.shop100"
        }
    });

    var mail = {
        from: "On Shop Storeline <on.shop.storeline@gmail.com>",
        to: "nazargichva@gmail.com",
        subject: "Confirm email",
        text: "Hello. Please confirm your email with this key: " + key,
        html: "<b style='color: black'>Hello. Please confirm your email with this key: </b> <h2>" + key + "</h2>"
    };

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            set('key', key);
            document.location.href = '../html/confirmation.html';
        }
        smtpTransport.close();
    });
}

function generateKey() {
    var key = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
    for (var i = 0; i < 10; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
}