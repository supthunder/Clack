var debug = require('debug')('Clack:state');

function State(io) {
    this.io = io
    this.pollingOpen = false;
    this.choicesCount = 0;
    this.votes = {};
    this.counter = 0;
}

module.exports = State;

State.prototype.uniqueid = function() {
    this.counter++;
    return this.counter;
}

State.prototype.openPolls = function(choicesCount) {
    debug('opening votes');
    this.choicesCount = choicesCount;
    this.votes = {};
    this.pollingOpen = true;
    this.io.emit('pollingOpen', {choicesCount: choicesCount});
}

State.prototype.closePolls = function() {
    debug('closing votes');
    this.pollingOpen = false;
    this.io.emit('pollingClose');
}

State.prototype.recordVote = function(vote, uniqueid) {
    //TODO: do something
    this.io.emit('voteUpdate', {
        count: 492,
    });
}
