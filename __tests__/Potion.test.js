const Potion = require('../lib/Potion.js')

test('creates a health potion object',function() {
    const potion = new Potion('health')

    expect(potion.name).toBe('health')
    expect(potion.value).toEqual(expect.any(Number))
    expect(potion.name.length).toBeGreaterThan(0)
})