var mailer = require('nodemailer');
var crypt = require('crypto');
var email;
var key;
var confirmation_key;
var password;
var confirmation_password;

$(function () {
    $('.email-forgot-password').keydown(function (e) {
        if (e.keyCode === 13) forgotPassword();
    });
});

function forgotPassword() {
    email = $('.email-forgot-password').val();
    if (validateEmail(email)) {
        checkEmail(email, function (err, res) {
            if (!err) {
                if (res) {
                    key = generateKey();
                    set('email', email);
                    confirmEmail(email, key, function (err, res) {
                        if (!err && res) {
                            $('.form-forgot-password.form-group').removeClass('has-error');
                            $('#helpForgotPassword').css('display', 'none');
                            $('.first-step').css('display', 'none');
                            $('.second-step').css('display', 'block');
                            $('.confirm2').click(function () {
                                confirmation_key = $('.log-confirmation').val();
                                confirmation_key = confirmation_key.toUpperCase();
                                if (validationConfirmation(key, confirmation_key)) {
                                    $('.second-step').css('display', 'none');
                                    $('.third-step').css('display', 'block');
                                    $('.forgot3').click(function () {
                                        password = $('.reg-password').val();
                                        confirmation_password = $('.reg-password2').val();
                                        if (validatePassword(password, confirmation_password)) {
                                            password = sha1(password);
                                            var data = {
                                                email: email,
                                                password: password
                                            };
                                            changePassword(data, function (err, res) {
                                                set('type', 'client');
                                                if (!err && res) document.location.href = '../html/catalog.html';
                                            })
                                        }
                                    });
                                    $('.reg-password').keydown(function (e) {
                                        if (e.keyCode === 13) {
                                            password = $('.reg-password').val();
                                            confirmation_password = $('.reg-password2').val();
                                            if (validatePassword(password, confirmation_password)) {
                                                password = sha1(password);
                                                var data = {
                                                    email: email,
                                                    password: password
                                                };
                                                changePassword(data, function (err, res) {
                                                    set('type', 'client');
                                                    if (!err && res) document.location.href = '../html/catalog.html';
                                                })
                                            }
                                        }
                                    });
                                    $('.reg-password2').keydown(function (e) {
                                        if (e.keyCode === 13) {
                                            password = $('.reg-password').val();
                                            confirmation_password = $('.reg-password2').val();
                                            if (validatePassword(password, confirmation_password)) {
                                                password = sha1(password);
                                                var data = {
                                                    email: email,
                                                    password: password
                                                };
                                                changePassword(data, function (err, res) {
                                                    set('type', 'client');
                                                    if (!err && res) document.location.href = '../html/catalog.html';
                                                })
                                            }
                                        }
                                    });
                                }
                            });
                            $('.log-confirmation').keydown(function (e) {
                               if (e.keyCode === 13) {
                                   confirmation_key = $('.log-confirmation').val();
                                   confirmation_key = confirmation_key.toUpperCase();
                                   if (validationConfirmation(key, confirmation_key)) {
                                       $('.second-step').css('display', 'none');
                                       $('.third-step').css('display', 'block');
                                       $('.forgot3').click(function () {
                                           password = $('.reg-password').val();
                                           confirmation_password = $('.reg-password2').val();
                                           if (validatePassword(password, confirmation_password)) {
                                               password = sha1(password);
                                               var data = {
                                                   email: email,
                                                   password: password
                                               };
                                               changePassword(data, function (err, res) {
                                                   set('type', 'client');
                                                   if (!err && res) document.location.href = '../html/catalog.html';
                                               })
                                           }
                                       });
                                       $('.reg-password').keydown(function (e) {
                                           if (e.keyCode === 13) {
                                               password = $('.reg-password').val();
                                               confirmation_password = $('.reg-password2').val();
                                               if (validatePassword(password, confirmation_password)) {
                                                   password = sha1(password);
                                                   var data = {
                                                       email: email,
                                                       password: password
                                                   };
                                                   changePassword(data, function (err, res) {
                                                       set('type', 'client');
                                                       if (!err && res) document.location.href = '../html/catalog.html';
                                                   })
                                               }
                                           }
                                       });
                                       $('.reg-password2').keydown(function (e) {
                                           if (e.keyCode === 13) {
                                               password = $('.reg-password').val();
                                               confirmation_password = $('.reg-password2').val();
                                               if (validatePassword(password, confirmation_password)) {
                                                   password = sha1(password);
                                                   var data = {
                                                       email: email,
                                                       password: password
                                                   };
                                                   changePassword(data, function (err, res) {
                                                       set('type', 'client');
                                                       if (!err && res) document.location.href = '../html/catalog.html';
                                                   })
                                               }
                                           }
                                       });
                                   }
                               }
                            });
                        }
                    });
                } else {
                    $('.form-forgot-password.form-group').addClass('has-error');
                    $('#helpForgotPassword').css('display', 'block');
                }
            }
        });
    }
}

function validateEmail(email) {
    var valid = true;
    if (email.length === 0) {
        $('.form-forgot-password.form-group').addClass('has-error');
        $('#helpForgotPassword').css('display', 'block');
        valid = false;
    } else {
        if (!validEmail(email)) {
            $('.form-forgot-password.form-group').addClass('has-error');
            $('#helpForgotPassword').css('display', 'block');
            valid = false;
        } else {
            $('.form-forgot-password.form-group').removeClass('has-error');
            $('#helpForgotPassword').css('display', 'none');
        }
    }
    return valid;
}

function validEmail(email) {
    var reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return reg.test(email);
}

function generateKey() {
    var key = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
    for (var i = 0; i < 10; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
}

function confirmEmail(email, key, callback) {
    var smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "on.shop.storeline@gmail.com",
            pass: "on.shop100"
        }
    });

    var mail = {
        from: "On Shop Storeline <on.shop.storeline@gmail.com>",
        to: email,
        subject: "Confirm email",
        text: "Hello. Please confirm your email to change password with this key: " + key,
        html: "<b style='color: black'>Hello. Please confirm your email to change password with this key: </b> <h2>" + key + "</h2>"
    };

    smtpTransport.sendMail(mail, function (err, response) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
        smtpTransport.close();
    });
}

function validationConfirmation(key, confirmation_key) {
    var valid = true;
    if (confirmation_key.length === 0 || key !== confirmation_key) {
        $('.form-confirmation.form-group').addClass('has-error');
        $('#helpConfirmation').css('display', 'block');
        valid = false;
    } else {
        $('.form-confirmation.form-group').removeClass('has-error');
        $('#helpConfirmation').css('display', 'none');
    }
    return valid;
}

function validatePassword(password, password2) {
    var valid = true;
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
    return valid;
}

function confirmPassword(password, password2) {
    return password === password2;
}

function sha1(string) {
    var sha1 = crypt.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}