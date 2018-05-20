const readline = require('readline-sync');

const {City} = require('./App/city.js');

let game = false;

console.log("Creation of your city :");
let nameOfCity = readline.question("What's the name of your city ? \n");
let nameOfDivinity = readline.question("What's the name of your divinity ? \n");

let a = new City(nameOfCity, 1000, 1000, nameOfDivinity, 1);
let b = new City('B', 1000, 1000, 'DB', 1);
const listOfCity = [a, b];
console.log("Creation done \nList of city : ");

listOfCity.forEach(function(element) {
  console.log("Ville : " + element.name + " | Ble : " + element.corn +
    " | Or : " + element.gold + " | Divinite : " + element.divinity.name);
  element.init();
});

while(game === false){
  let action = readline.question("What would you do ?\n1 : Offering Corn\n" +
    "2 : Offering Gold\n3 : Buy Corn\n4 : Sell Corn\n5 : Attack an other city\n");
  switch(action) {
    case 1:
      let offeringCorn = readline.question("How many ?\n");
      a.offeringCorn(offeringCorn).then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      });
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
  }
}