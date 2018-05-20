const readline = require('readline-sync');

const {City} = require('./App/city.js');

const main = () => {
  let game = false;

  console.log("Creation of your city :");
  let nameOfCity = readline.question("What's the name of your city ? \n");
  let nameOfDivinity = readline.question("What's the name of your divinity ? \n");

  let a = new City(nameOfCity, nameOfDivinity, 1);
  let b = new City('B', 'DB', 1);
  const listOfCity = [a, b];
  console.log("Creation done \nList of city : ");

  listOfCity.forEach(function(element) {
    console.log("Ville : " + element.name + " | Ble : " + element.corn +
      " | Or : " + element.gold + " | Divinite : " + element.divinity.name);
    element.init();
  });

  while(game === false){
    let action = Number(readline.question("What would you do ?\n1 : Offering Corn\n" +
      "2 : Offering Gold\n3 : Buy Corn\n4 : Sell Corn\n5 : Attack an other city\n"));
    if (action === 1) {
      let nbrCorn = Number(readline.question("How many ?\n"));
      a.offeringCorn(nbrCorn)
        .then(() => console.log("Offering Corn Done"))
        .catch(err => console.log(err));
      game = true;
    }
  }
  process.exit();
};

main();

