var debug = require('debug')('Clack:state');

function State(io) {
    this.io = io
    this.pollingOpen = false;
    this.choicesCount = 0;
    this.votes = {};
    this.counter = 0;
    this.studentSubmit = {};
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
    this.studentSubmit = {};
    this.pollingOpen = true;
    this.io.emit('pollingOpen', {choicesCount: choicesCount});
}

State.prototype.closePolls = function() {
    debug('closing votes');
    this.pollingOpen = false;
    this.io.emit('pollingClose');
}

State.prototype.recordVote = function(vote, uniqueid) {
    //if this user has never entered a vote before let's log it
    if(!(uniqueid in this.studentSubmit)){
        this.studentSubmit[uniqueid] = vote;
        
        //if this vote has never been chosen before
        if(!(vote in this.votes)){
            this.votes[vote] = 1;
        }
        
        //if this vote has bee chose before
        else{
            this.votes[vote]++;
        }
    }
    //if they have logged a vote before we need to update their new choice
    else{

        //get their previous submission which we will subtract the total count from later
        previousChoice = this.studentSubmit[uniqueid];
    
        //If the choice they made is not the same as the choice they have made before
        // basically if they have made a new choice then do something
        if(previousChoice != vote){        

            //update their key with their new vote choice
            this.studentSubmit[uniqueid] = vote;

            this.votes[previousChoice]--;

            // If never chosen before
            if(!(vote in this.votes)){
                this.votes[vote] = 1;
            }
            
            //if this vote has bee chose before
            else{
                this.votes[vote]++;
            }
        }
    }    
    // Now we need to update stats
    debug(this.votes);
}
