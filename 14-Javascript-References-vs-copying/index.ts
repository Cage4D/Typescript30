const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

const team = players.slice();
const team2 = [].concat(players);
const team3 = [...players]

const person = {
      name: 'Wes Bos',
      age: 80
};

const captain = person;
captain.number = 99;

const cap2 = Object.assign({}, person, { number: 99 })
const cap3 = {...person}