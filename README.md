# TP-2C-2018-RAFFATIN

Git :
```
git clone https://github.com/Firekipt/JS.git
nmp install
nmp start
```

## Done :
We have 3 classes :
  - divinity to create a divinity and then, offering corn or gold to this
  divinity. Once offering is done, this divinity can emit three events, favor (100%),
  blessing (5%) and retribution (1%). I don't really understand what was retribution so,
  I force city to loose money and corn on retribution.

  - city to create a city, each city gets a divinity and can offering corn or gold to her.
  We can trade corn with other city, so corn costs 2g/u and it can be sold to 1g/u,
  each trading has 20% to fail, so you loose what you wanted to trade.

  - troop to create troop. City can buy a number of troop for 3g/u.

## ToDo :
  - a city can fight an other city with his troop chosen. Then, the city which is attacked,
  can defend itself if it has his own troop.
  - IA for other city with interval and action on probability.

## Game :
  - We choose our name of city.
  - We choose our name of divinity.
  - Display each city with his number of corn and gold and his divinity associated.
  (Only two cities for now, own and a test city)
  - We choose an action
  - Between each action, we have the updating of corn and gold of our city.
  (Cause readline blocks the code, it means that when we respond for a question, the time is stopped)
