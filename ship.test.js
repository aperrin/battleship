

// Setup the game (game -> type module)
const game = require('./battleship.js');

test("Ship initialization default orientation", () => {
	var ship = new game.Ship("it's me!", 3);
	expect(ship.name).toEqual("it's me!"); 
	expect(ship.size).toBe(3); 
	expect(ship.orientation).toBe('H'); 
	expect(ship.states).toEqual([0, 0, 0]);
});

test("Ship initialization given orientation", () => {
	var ship = new game.Ship("it's me!", 3, 'V');
	expect(ship.name).toEqual("it's me!"); 
	expect(ship.size).toBe(3); 
	expect(ship.orientation).toBe('V'); 
	expect(ship.states).toEqual([0, 0, 0]);
});

test("Ship rotation from default orientation", () => {
	var ship = new game.Ship("it's me!", 3);
	ship.rotate();
	expect(ship.orientation).toBe('V');
});

test("Ship rotation from V", () => {
	var ship = new game.Ship("it's me!", 3, 'V');
	ship.rotate();
	expect(ship.orientation).toBe('H');
});
