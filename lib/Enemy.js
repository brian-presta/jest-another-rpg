const Potion = require('./Potion.js')
function Enemy(name,weapon) {
    this.name = name;
    this.weapon = weapon;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];
};
Enemy.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    }
}
Enemy.prototype.getInventory = function() {
    return (this.inventory[0]) ? this.inventory : false;
}
Enemy.prototype.getHealth = function() {
    return `The ${this.name}'s health is now ${this.health}`
}
Enemy.prototype.isAlive = function() {
    return (this.health > 0)
}
Enemy.prototype.reduceHealth = function(damage) {
    this.health -= damage
    if (this.health < 0) {
        this.health = 0
    }
}
Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5
    const max = this.strength + 5
    return Math.floor(Math.random() * (max - min) + min);
}
Enemy.prototype.addPotion = function(potion) {
    this.inventory.push(potion)
}
Enemy.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index,1)[0]
    switch (potion.name) {
        case 'agility':
            this.agility += potion.value
            break
        case 'health':
            this.health += potion.value
            break
        case 'strength':
            this.strength += potion.value
            break
    }
}
Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`
}
module.exports = Enemy
