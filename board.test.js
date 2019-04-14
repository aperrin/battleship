
// Setup the game (game -> type module)
const game = require('./battleship.js');
var h_ship = new game.Ship("it's me!", 3);
var v_ship = new game.Ship("it's me!", 5, 'V');


test("Board default initialization", () => {
	var board = new game.Board();
	expect(board.size).toBe(10);
	expect(board.grid).toEqual([[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null],
								[null, null, null, null, null, null, null, null, null, null]]);
});


test("Board initialization with given size", () => {
	var board = new game.Board(4);
	expect(board.size).toBe(4); 
	expect(board.grid).toEqual([[null, null, null, null],
								[null, null, null, null],
								[null, null, null, null],
								[null, null, null, null]]);
});


test("Is free ok", () => {
	var board = new game.Board();
	expect(board.is_free(h_ship, 3, 7)).toBeTruthy();
});


test("Is free out", () => {
	var board = new game.Board();
	expect(board.is_free(h_ship, 3, 8)).toBeFalsy();
});


test("Is not free", () => {
	var board = new game.Board();
	board.grid[3][8] = 1;
	expect(board.is_free(h_ship, 3, 7)).toBeFalsy();
});

test("Is free ok for V orientation", () => {
	var board = new game.Board();
	expect(board.is_free(v_ship, 5, 3)).toBeTruthy();
});


test("Is free out V orientation", () => {
	var board = new game.Board();
	expect(board.is_free(v_ship, 6, 6)).toBeFalsy();
});


test("Is not free V orientation", () => {
	var board = new game.Board();
	board.grid[8][3] = 1;
	expect(board.is_free(v_ship, 5, 3)).toBeFalsy();
});


test("Add h_ship ", () => {
	var board = new game.Board();
	var val = board.add_ship(h_ship, 0, 0);
	expect(val).toBeTruthy();
	for(let i=0;i<h_ship.size;i++)
		expect(board.grid[0][i]).toBe(h_ship);
});


test("Add v_ship ", () => {
	var board = new game.Board();
	var val = board.add_ship(v_ship, 0, 0);
	expect(val).toBeTruthy();
	for(let i=0;i<v_ship.size;i++)
		expect(board.grid[i][0]).toBe(v_ship);
});

test("Double add h_ship ", () => {
	var board = new game.Board();
	var val = board.add_ship(h_ship, 0, 0);
	var val2 = board.add_ship(h_ship, 0, 0);
	expect(val).toBeTruthy();
	expect(val2).toBeFalsy();
	for(let i=0;i<h_ship.size;i++)
		expect(board.grid[0][i]).toBe(h_ship);
});


test("Double add v_ship ", () => {
	var board = new game.Board();
	var val = board.add_ship(v_ship, 0, 0);
	var val2 = board.add_ship(v_ship, 0, 0);
	expect(val).toBeTruthy();
	expect(val2).toBeFalsy();
	for(let i=0;i<v_ship.size;i++)
		expect(board.grid[i][0]).toBe(v_ship);
});


test("Add ship no collision", () => {
	var board = new game.Board();
	var val = board.add_ship(h_ship, 1, 0);
	var val2 = board.add_ship(v_ship, 0, 3);
	expect(val).toBeTruthy();
	expect(val2).toBeTruthy();
	for(let i=0;i<h_ship.size;i++)
		expect(board.grid[1][i]).toBe(h_ship);
	for(let i=0;i<v_ship.size;i++)
		expect(board.grid[i][3]).toBe(v_ship);
});


test("Add ship collision", () => {
	var board = new game.Board();
	var val = board.add_ship(h_ship, 1, 0);
	var val2 = board.add_ship(v_ship, 0, 2);
	expect(val).toBeTruthy();
	expect(val2).toBeFalsy();
	for(let i=0;i<h_ship.size;i++)
		expect(board.grid[1][i]).toBe(h_ship);
	for(let i=0;i<v_ship.size;i++) {
		if (i == 1)
			continue;
		expect(board.grid[i][2]).toBe(null);
	}
});


test("Check attack no ship", () => {
	var board = new game.Board();
	for (let row=0 ; row<board.size ; row++) {
        for (let col=0 ; col<board.size ; col++)
            expect(board.check_attack(row, col)).toBeFalsy();
    }
	
});


test("Check attack ship", () => {
	var board = new game.Board();
	board.add_ship(h_ship, 1, 1);
	for (let row=0 ; row<board.size ; row++) {
            for (let col=0 ; col<board.size ; col++)
            	if (row == 1 && col >= 1 && col < 1+h_ship.size)
					expect(board.check_attack(row, col)).toBeTruthy();
				else
                	expect(board.check_attack(row, col)).toBeFalsy();
        }
});

// test("Board initialization with given size", () => {
	
// });


