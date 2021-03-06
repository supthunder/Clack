var debug = require('debug')('Clack:socketio');
var State = require("./state");


module.exports = function(server) {
    // Socket.io
    var io = require('socket.io')(server);
    var state = new State(io);

    function myHandler(socket) {
        debug("user connected");
        socket.uniqueid = state.uniqueid();
        // XXX: Note, this means that anyone could open or close votes. We need
        // to only do this for presenter pages, but I don't feel like it yet.
        if (state.pollingOpen) {
            socket.emit('pollingOpen', {choicesCount: state.choicesCount});
            socket.emit('voteUpdate', {votes: state.votes});
        } else {
            socket.emit('pollingClose');
        }
        socket.on('openVotes', function(msg) {
            state.openPolls(4);
        });
        socket.on('closeVotes', function(msg) {
            state.closePolls();
        });
        socket.on('vote', function(data) {
            if (state.pollingOpen == false) {
                socket.emit("softerror", "Polling is not open");
                return;
            }
            state.recordVote(data.vote, socket.uniqueid);
            debug(JSON.stringify(data));
        });
    }

    io.on('connection', myHandler);
}
