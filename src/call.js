function show (content) {
    document.querySelector('html').innerText = content;
}

var string = '你好';
module.exports = {
    show,
    string
}