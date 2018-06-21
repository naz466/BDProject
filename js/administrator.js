var id;
var pass;

function log() {
    id = $('.log-id').val();
    pass = $('.log-pass').val();

    if (validationLog(id, pass)) {
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