$('.authorization').click(function () {
    document.location.href = '../html/authorization.html';
});

$('.registration').click(function () {
    document.location.href = '../html/registration.html';
});

$('.administrator').click(function () {
    document.location.href = '../html/administrator.html';
});

$('.back').click(function () {
    document.location.href = '../html/main.html';
});

$('.forgot').click(function () {
    document.location.href = '../html/forgotPassword.html';
});

$('.sign-up').click(function () {
    signUp();
});

$('.sign-in').click(function () {
    signIn();
});

$('.log').click(function () {
    log();
    // log2();
});

$('.confirm').click(function () {
    confirmation();
});

$('.forgot2').click(function () {
    forgotPassword();
});