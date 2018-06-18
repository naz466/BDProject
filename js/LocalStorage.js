var basil = require('basil.js');
basil = new basil();

function set(key, value) {
    return basil.set(key, value);
}

function get(key) {
    return basil.get(key);
}