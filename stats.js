module.exports = {
    runServer: function () {
        console.log('Starting stats socket server');
        var app = require('express')();
        var http = require('http').Server(app);
        var io = require('socket.io')(http);

        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/build/stats.html');
        });

        io.on('connection', function (socket) {
            socket.on('avgs', function(data){
                io.emit('avgs', data);
            })
        });

        http.listen(3000, function () {
            console.log('listening on localhost:3000');
        });
    }
};
