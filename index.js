const readline = require('readline-sync');

const {City} = require('./App/city.js');

/* Method to display city's information */
const displayCityInformation = listOfCity => {
  console.log('---------------------City\'s Information---------------------');
  listOfCity.forEach(element => {
    console.log('City : ' + element.name + ' | Corn : ' + element.corn +
      ' | Gold : ' + element.gold + ' | Divinity : ' + element.divinity.name +
      ' | Divinity Corn : ' + element.divinity.corn +
      ' | Divinity Gold : ' + element.divinity.gold);
  });
};

const action = async (listOfCity, listOfCityName) => {
  const listOfAction = ['Offering Corn', 'Offering Gold', 'Buy Corn',
    'Sell Corn', 'Attack', 'Quit'];
  let nbrCorn;
  let nbrGold;

  let index = readline.keyInSelect(listOfAction, 'What would you do ?');

  switch (index) {
    case 0:
      nbrCorn = Number(readline.question('How many ? '));
      await listOfCity[0].offeringCorn(nbrCorn);
      listOfCity[0].endWorld();
      listOfCity[0].init();
      break;
    case 1:
      nbrGold = Number(readline.question('How many ? '));
      await listOfCity[0].offeringGold(nbrGold);
      listOfCity[0].endWorld();
      listOfCity[0].init();
      break;
    case 2:
      nbrCorn = Number(readline.question('How many ? '));
      index = readline.keyInSelect(listOfCityName, 'Which city ? ');
      await listOfCity[0].buyCorn(listOfCity[index + 1], nbrCorn);
      break;
    case 3:
      nbrCorn = Number(readline.question('How many ? '));
      index = readline.keyInSelect(listOfCityName, 'Which city ? ');
      await listOfCity[0].sellCorn(listOfCity[index + 1], nbrCorn);
      break;
    case 4:
      await displayCityInformation(listOfCity);
      break;
    case 5:
      return;
    default:
      break;
  }
  await action(listOfCity, listOfCityName);
};

const main = async () => {
  console.log('Creation of your city :');

  const nameOfCity = readline.question('What\'s the name of your city ? ');
  const nameOfDivinity =
    readline.question('What\'s the name of your divinity ? ');

  const a = new City(nameOfCity, nameOfDivinity);
  const b = new City('test', 'test');
  const listOfCity = [a, b];
  const listOfCityName = [b.name];
  console.log('Creation done \nList of city : ');

  displayCityInformation(listOfCity);

  setInterval(async () => {
    if (a.corn <= 0 && a.gold <= 0 && a.divinity.corn <= 0 &&
      a.divinity.gold <= 0) {
      console.log('You loose :(');
      return;
    }

    listOfCity.forEach(element => {
      if (element.corn <= 0 && element.gold <= 0 && element.divinity.corn <=
        0 && element.divinity.gold <= 0) {
        console.log(element + ' is fallen !');
        const pos = listOfCity.indexOf(element);
        listOfCity.splice(pos, 1);
      }
    });
  }, 1000);

  await action(listOfCity, listOfCityName);
};

main()
  .then(() => console.log('Game finished'))
  .then(() => process.exit(0));

