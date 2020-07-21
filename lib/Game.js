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
                    return
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
                })
            }
            else {
                this.currentEnemy.reduceHealth(this.player.getAttackValue())
                console.log(`You attack the ${this.currentEnemy.name}!`)
                console.log(this.currentEnemy.getHealth())
            }
        })
    }
    else {
        this.player.reduceHealth(this.currentEnemy.getAttackValue())
        console.log(`You were attack by the ${this.currentEnemy.name}!`)
        console.log(this.player.getHealth())
    }
}
module.exports = Game
