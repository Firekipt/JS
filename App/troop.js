const EventEmitter = require('events');

class Troop {
  constructor(nbr, timeFactor) {
    this.nbr_ = nbr;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {

  }

  fight() {

  }

  defend() {

  }

  get nbr() {
    return this.nbr_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  endWorld() {

  }
}

module.exports = {Troop};
