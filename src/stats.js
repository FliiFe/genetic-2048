// URL = http://localhost:3000/socket.io/socket.io.js

function testSocket() {
    $.ajax({
        type: 'HEAD',
        url: 'http://localhost:3000/',
        success: function () {
            $.getScript('http://localhost:3000/socket.io/socket.io.js').done(function () {
                window.socket = io('http://localhost:3000');
            });
        },
        error: function () {
            window.socket = {
                emit: function () {}
            };
        },
        crossDomain: true
    });
}

testSocket();
setTimeout(testSocket, 2000);
