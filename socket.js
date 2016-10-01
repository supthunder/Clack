var debug = require('debug')('Clack:socketio');

function myHandler(socket) {
    debug("user connected");
    setTimeout(function() {
        socket.emit('message', "hi");
    }, 5000);
    socket.on('message', function(msg) {
        debug(msg);
    });
}

module.exports = function(server) {
    // Socket.io
    var io = require('socket.io')(server);

    io.on('connection', myHandler);
}
