const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

const {City} = require('../App/city.js');

chai.use(chaiAsPromised);
chai.should();

describe('world-worldEvents_.js', () => {
  describe('City', () => {
    const g = new City('Fort-Joie', 'Zeus', 1);

    it('should update divinity\'s corn', async () => {
      g.divinity.corn.should.be.equal(0);
      g.corn.should.be.equal(1000);

      await g.offeringCorn(100);
      g.corn.should.be.equal(900);
      g.divinity.corn.should.be.equal(100);

      await g.offeringCorn(-1);
      g.corn.should.be.equal(900);
      g.divinity.corn.should.be.equal(0);
    });

    it('should update divinity\'s gold', async () => {
      g.divinity.gold.should.be.equal(0);
      g.gold.should.be.equal(1000);

      await g.offeringGold(100);
      g.gold.should.be.equal(900);
      g.divinity.gold.should.be.equal(100);

      await g.offeringGold(200);
      g.gold.should.be.equal(700);
      g.divinity.gold.should.be.equal(300);

      await g.offeringGold(-1);
      g.gold.should.be.equal(700);
      g.divinity.gold.should.be.equal(0);
    });
  });

  describe('Updated values on Trade', () => {
    const g = new City('Fort-Joie', 'Zeus', 1);
    const h = new City('Néant', 'Gara', 1);

    it('should update city\'s corn and gold on trade', async () => {
      g.corn.should.be.equal(1000);
      h.corn.should.be.equal(1000);
      g.gold.should.be.equal(1000);
      h.gold.should.be.equal(1000);

      await g.buyCorn(h, 100);
      g.corn.should.be.equal(1100);
      h.corn.should.be.equal(900);
      g.gold.should.be.equal(800);
      h.gold.should.be.equal(1200);

      await (g.buyCorn(h, 'a')).should.be.rejectedWith(Error,
        /You didn't gave a number of corn/);

      await (g.buyCorn(h, -4)).should.be.rejectedWith(Error,
        /You are a thief !/);
    });
  });

  describe('Updated values for Favor and Blessings', () => {
    it('should have modified the values for favor', async () => {
      const g = new City('Fort-Joie', 'Zeus', 1);

      g.corn.should.be.equal(1000);
      g.gold.should.be.equal(1000);

      await Promise.all([
        g.offeringCorn(200),
        g.offeringGold(1000)
      ]);

      g.divinity.corn.should.be.equal(200);
      g.divinity.gold.should.be.equal(1000);

      g.init();

      await new Promise(resolve => {
        g.worldEvents.on('favor', () => {
          g.corn.should.be.equal(820);
          g.gold.should.be.equal(100);
          g.endWorld();
          resolve();
        });
      });
    });

    it('should have modified the values for blessing', async () => {
      const g = new City('Fort-Joie', 'Zeus', 1);

      g.corn.should.be.equal(1000);
      g.gold.should.be.equal(1000);

      await Promise.all([
        g.offeringCorn(100),
        g.offeringGold(1000)
      ]);

      g.divinity.corn.should.be.equal(100);
      g.divinity.gold.should.be.equal(1000);

      g.corn.should.be.equal(900);
      g.gold.should.be.equal(0);

      g.init();

      let a;
      let b;

      await new Promise(resolve => {
        g.worldEvents.on('favor', () => {
          a = g.corn;
          b = g.gold;
        });

        g.worldEvents.on('blessing', blessing => {
          blessing.corn.should.be.equal(10000);
          blessing.gold.should.be.equal(100000);
          g.corn.should.be.equal(a + 10000);
          g.gold.should.be.equal(b + 100000);
          g.endWorld();
          resolve();
        });
      });
    });
  });
});
