var debug = require('debug')('Clack:socketio');

module.exports = function(server) {
    // Socket.io
    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
        debug("user connected");
        setTimeout(function() {
            socket.emit('message', "hi");
        }, 5000);
    });
}
