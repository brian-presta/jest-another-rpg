const Enemy = require('../lib/Enemy')
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');
test('creates a enemy object', () => {
    const enemy = new Enemy('goblin','sword');
    expect(enemy.name).toBe('goblin')
    expect(enemy.weapon).toBe('sword')
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
  });