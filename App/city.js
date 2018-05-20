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
      this.corn_ = this.corn + favor.corn;
      this.gold_ = this.gold + favor.gold;
    });

    this.worldEvents.on('blessing', blessing => {
      this.corn_ = this.corn + blessing.corn;
      this.gold_ = this.gold + blessing.gold;
    });

    this.worldEvents.on('retribution', retribution => {
      this.corn_ = (this.corn - retribution >= 0) ? this.corn - retribution: 0;
    });

    /*this.troop.worldEvents.on('fight', (city, troop) => {
      if(city.name === this.name) {
        this.troop.defend(troop);
      }
      this.troop.endWorld();
    });*/
  }

  /* Le blé s'achète 2po/u */
  buyCorn(city, numberOfCorn) {
    return new Promise((resolve, reject) => {
      if (typeof numberOfCorn === 'number') {
        if (numberOfCorn > 0) {
          setTimeout(() => {
            if (Math.random() > 0.80) { /* 20% de chance de se faire attaquer
            et de perdre l'or qu'on voulait échanger */
              this.gold_ = (this.gold - (numberOfCorn * 2));
            } else {
              this.corn_ = (this.corn + numberOfCorn);
              city.corn_ = (city.corn - numberOfCorn);
              this.gold_ = (this.gold - (numberOfCorn * 2));
              city.gold_ = (city.gold + (numberOfCorn * 2));
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

  /* Le blé se vend 1po/u */
  sellCorn(city, numberOfCorn) {
    return new Promise((resolve, reject) => {
      if (typeof numberOfCorn === 'number') {
        if (numberOfCorn > 0) {
          setTimeout(() => {
            if (Math.random() > 0.80) { /* 20% de chance de se faire attaquer
            et de perdre le blé qu'on voulait échanger */
              this.corn_ = (this.corn - numberOfCorn);
            } else {
              this.corn_ = (this.corn - numberOfCorn);
              city.corn_ = (city.corn + numberOfCorn);
              this.gold_ = (this.gold + numberOfCorn);
              city.gold_ = (city.gold - numberOfCorn);
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

  async offeringCorn (offer) {
    if (typeof offer === 'number') {
      this.corn_ = (offer >= 0) ? this.corn - offer : this.corn;
      await this.divinity.offeringCorn(offer);
    } else {
      console.log("Invalid Input");
    }
  };

  async offeringGold(offer) {
    if (typeof offer === 'number') {
      this.gold_ = (offer >= 0) ? this.gold - offer : this.gold;
      await this.divinity.offeringGold(offer);
    } else {
      console.log("Invalid Input");
    }
  }

  /* Un soldat coûte 3po/u et n'est pas rémunéré pour l'instant */
  buyTroop(nbr){
    if (typeof nbr === 'number' && nbr > 0) {
      let troop_ = new Troop(nbr, this.timeFactor);
      this.troop.push(troop_);
      this.gold_ = this.gold - (nbr * 3);
    }
  }

  displayTroop(){
    for(let i = 0; i < this.troop.length; i++){
      console.log("Troupe " + (i+1) + " : " + this.troop[i].nbr);
    }
  }

  /*fight(city, troop) {
    troop.fight(city);
  }*/

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
