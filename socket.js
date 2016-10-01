var debug = require('debug')('Clack:socketio');

function myHandler(socket) {
    debug("user connected");
    setTimeout(function() {
        socket.emit('debug', "hi");
    }, 5000);
    socket.on('openVotes', function(msg) {
        debug("should open votes");
    });
    socket.on('closeVotes', function(msg) {
        debug("should close votes");
    });
}

module.exports = function(server) {
    // Socket.io
    var io = require('socket.io')(server);

    io.on('connection', myHandler);
}
