const {Divinity} = require('../App/divinity.js');
const {Troop} = require('../App/troop.js');

class City {
  constructor(name, nameOfDivinity, timeFactor) {
    this.name_ = name;
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.troop_ = [];
    this.timeFactor_ = timeFactor || 1000;
    this.divinity_ = new Divinity(nameOfDivinity, this.timeFactor);
  }

  init() {
    this.divinity.init();

    this.worldEvents.on('favor', favor => {
      console.log('FAVOR ! :)');
      this.corn_ = this.corn + favor.corn;
      this.gold_ = this.gold + favor.gold;
    });

    this.worldEvents.on('blessing', blessing => {
      console.log('BLESSING ! :D');
      this.corn_ = this.corn + blessing.corn;
      this.gold_ = this.gold + blessing.gold;
    });

    this.worldEvents.on('retribution', retribution => {
      console.log('RETRIBUTION !');
      this.corn_ = (this.corn - retribution >= 0) ?
        (this.corn - retribution) : 0;
      this.gold_ = (this.gold - retribution >= 0) ?
        (this.gold - retribution) : 0;
    });
  }

  /* Corn costs 2g/u */
  buyCorn(city, numberOfCorn) {
    return new Promise((resolve, reject) => {
      if (typeof numberOfCorn === 'number') {
        if (numberOfCorn > 0 && (city.corn - numberOfCorn) >= 0) {
          setTimeout(() => {
            if (Math.random() > 0.80) { /* 20% to loose trading */
              this.gold_ = (this.gold - (numberOfCorn * 2));
              console.log('................Your trade failed................');
              resolve();
            } else {
              this.corn_ = (this.corn + numberOfCorn);
              city.corn_ = (city.corn - numberOfCorn);
              this.gold_ = (this.gold - (numberOfCorn * 2));
              city.gold_ = (city.gold + (numberOfCorn * 2));
              console.log('................Your trade succeed...............');
              resolve();
            }
          }, 4 * this.timeFactor * Math.random());
        } else {
          reject(new Error(
            `You can't rip off`
          ));
        }
      } else {
        reject(new Error(
          `You didn't gave a number of corn`
        ));
      }
    });
  }

  /* Corn is sold 1g/u */
  async sellCorn(city, numberOfCorn) {
    return new Promise((resolve, reject) => {
      if (typeof numberOfCorn === 'number') {
        if (numberOfCorn > 0) {
          setTimeout(() => {
            if (Math.random() > 0.80) { /* 20% to loose trading */
              this.corn_ = (this.corn - numberOfCorn);
              console.log('................Your trade failed................');
              resolve();
            } else {
              this.corn_ = (this.corn - numberOfCorn);
              city.corn_ = (city.corn + numberOfCorn);
              this.gold_ = (this.gold + numberOfCorn);
              city.gold_ = (city.gold - numberOfCorn);
              console.log('................Your trade succeed...............');
              resolve();
            }
          }, 4 * this.timeFactor * Math.random());
        } else {
          reject(new Error(
            `You can't rip off`
          ));
        }
      } else {
        reject(new Error(
          `You didn't gave a number of corn`
        ));
      }
    });
  }

  async offeringCorn(offer) {
    if (typeof offer === 'number') {
      if (offer === 0) {
        console.log('Poor Divinity');
      } else {
        await this.divinity.offeringCorn(offer);
        this.corn_ = (offer > 0) ? this.corn - offer : this.corn;
        console.log('................Your offering is done...............');
      }
    } else {
      console.log('Invalid Input');
    }
  }

  async offeringGold(offer) {
    if (typeof offer === 'number') {
      if (offer === 0) {
        console.log('Poor Divinity');
      } else {
        await this.divinity.offeringGold(offer);
        this.gold_ = (offer > 0) ? this.gold - offer : this.gold;
        console.log('................Your offering is done...............');
      }
    } else {
      console.log('Invalid Input');
    }
  }

  /* Troop costs 3g/u */
  buyTroop(nbr) {
    if (typeof nbr === 'number' && nbr > 0) {
      let troop_ = new Troop(nbr);
      this.troop.push(troop_);
      this.gold_ = this.gold - (nbr * 3);
    }
  }

  displayTroop() {
    for (let i = 0; i < this.troop.length; i++) {
      console.log('Troupe ' + (i + 1) + ' : ' + this.troop[i].nbr);
    }
  }

  get divinity() {
    return this.divinity_;
  }

  get troop() {
    return this.troop_;
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get worldEvents() {
    return this.divinity.worldEvents;
  }

  endWorld() {
    this.divinity.endWorld();
  }
}

module.exports = {City};
