var debug = require('debug')('Clack:socketio');


module.exports = function(server) {
    var state = {
        pollingOpen: false,
    };
    // Socket.io
    var io = require('socket.io')(server);

    function myHandler(socket) {
        debug("user connected");
        setTimeout(function() {
            socket.emit('debug', "hi");
        }, 5000);
        // XXX: Note, this means that anyone could open or close votes. We need
        // to only do this for presenter pages, but I don't feel like it yet.
        socket.on('openVotes', function(msg) {
            debug('opening votes');
            state.pollingOpen = true;
            io.emit('pollingOpen', {choicesCount: 4});
            setTimeout(function() {
                socket.emit('voteUpdate', {
                    count: 492,
                });
            }, 5000);
        });
        socket.on('closeVotes', function(msg) {
            debug('closing votes');
            state.pollingOpen = false;
            io.emit('pollingClose');
        });
        socket.on('vote', function(data) {
            debug(JSON.stringify(data));
        });
    }

    io.on('connection', myHandler);
}
