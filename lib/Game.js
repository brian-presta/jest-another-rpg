const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}
Game.prototype.initializeGame = function() {
    this.enemies = [new Enemy('goblin','sword'),new Enemy('orc','baseball bat'),new Enemy('skeleton','axe')]
    this.currentEnemy = this.enemies[0]
    inquirer.prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    .then( ({name}) => {
        this.player = new Player(name)
        this.startNewBattle()
    })
}
Game.prototype.startNewBattle = function() {
    (this.player.agility > this.currentEnemy.agility) ? this.isPlayerTurn = true : this.isPlayerTurn = false ;
    console.log('Your stats are:')
    console.table(this.player.getStats())
    console.log(this.currentEnemy.getDescription())
    this.battle()
}
Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer.prompt({
            type:'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack','Use Potion']
        })
        .then(({action}) => {
            if (action === 'Use Potion') {
                if(!this.player.getInventory()) {
                    console.log("You're out of potions!")
                    return this.checkEndOfBattle()
                }
                inquirer.prompt({
                    type:'list',
                    message: 'Which potion would you like to use?',
                    name: 'potion',
                    choices: this.player.inventory.map((item,index) => `${index + 1}: ${item.name}`)
                })
                .then(({potion}) => {
                    potionDetails = potion.split(':');
                    this.player.usePotion(potionDetails[0] - 1)
                    console.log(`You used a${potionDetails[1]} potion!`)
                    return this.checkEndOfBattle()
                })
            }
            else {
                this.currentEnemy.reduceHealth(this.player.getAttackValue())
                console.log(`You attack the ${this.currentEnemy.name}!`)
                console.log(this.currentEnemy.getHealth())
                return this.checkEndOfBattle()
            }
        })
    }
    else {
        this.player.reduceHealth(this.currentEnemy.getAttackValue())
        console.log(`You were attack by the ${this.currentEnemy.name}!`)
        console.log(this.player.getHealth())
        return this.checkEndOfBattle()
    }
}
Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn
        return this.battle()
    }
    if (this.currentEnemy.isAlive()) {
        console.log(`You've died! You reached round ${this.roundNumber + 1}.`)
        return
    }
    console.log(`You've defeated the ${this.currentEnemy.name}!`)
    this.player.addPotion(this.currentEnemy.potion)
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion!`)
    this.roundNumber++
    if (this.roundNumber < this.enemies.length) {
        this.currentEnemy = this.enemies[this.roundNumber]
        this.startNewBattle()
    }
    else {
        console.log("You've won the game!")
    }

}
module.exports = Game
