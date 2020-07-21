const Potion = require('./Potion.js')
function Enemy(name,weapon) {
    this.name = name;
    this.weapon = weapon;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];
};

module.exports = Enemy