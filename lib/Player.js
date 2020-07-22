const Potion = require('./Potion')
const Character = require('./Character')

class Player extends Character{
    constructor(name = '') {
        super(name)
        this.inventory = [new Potion('health'), new Potion()];
    }
    getInventory() {
        return (this.inventory[0]) ? this.inventory : false;
    }
    
    addPotion(potion) {
        this.inventory.push(potion)
    }
    usePotion(index) {
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
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        }
    }
    
}
module.exports = Player
