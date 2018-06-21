var confirmation_key;

function confirmation() {
    var key = get('key');
    confirmation_key = $('.reg-confirmation').val();
    confirmation_key = confirmation_key.toUpperCase();
    if (validationConfirmation(key, confirmation_key)) {
        var surname = get('surname');
        var name = get('name');
        var email = get('email');
        var password = get('password');
        var phone = get('phone');
        var data = {
            surname: surname,
            name: name,
            email: email,
            password: password,
            phone: phone
        };
        register(data, function (err, res) {
            set('type', 'client');
            if (!err && res) document.location.href = '../html/catalog.html';
        });
    }
}

function validationConfirmation(key, confirmation_key) {
    var valid = true;
    if (confirmation_key.length === 0 || key !== confirmation_key) {
        $('.reg-confirmation.form-group').addClass('has-error');
        $('#helpConfirmation').css('display', 'block');
        valid = false;
    } else {
        $('.reg-confirmation.form-group').removeClass('has-error');
        $('#helpConfirmation').css('display', 'none');
    }
    return valid;
}