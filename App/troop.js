const EventEmitter = require('events');

class Troop {
  constructor(nbr, timeFactor) {
    this.nbr_ = nbr;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {

  }

  fight(city) {
    this.worldEvents.emit('fight', {
      troop: this,
      city: city
    });
  }

  defend(troop) {
    return new Promise(resolve => {
      setTimeout(() => {
        if(this.nbr > troop.nbr) {
          /* La troupe attaquante meure */
          resolve();
        } else if (this.nbr === troop.nbr) {
          /* Rien */
          resolve();
        } else {
          /* La troupe qui défend est blessée */
          resolve();
        }
      }, 5 * this.timeFactor * Math.random());
    });
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
