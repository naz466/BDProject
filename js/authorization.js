var email;
var password;

function signIn() {
    email = $('.log-email').val();
    password = $('.log-password').val();

    if (validationSignIn(email, password)) {
        console.log('Clear');
    } else {
        console.log('Error');
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