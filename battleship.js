class Board {
 // 
    constructor(size=10) {
        // Define the grid as an array of arrays
        this.grid = [];
        this.size = size;

        for (let row=0 ; row<size ; row++) {
            this.grid.push([]);
            for (let col=0 ; col<size ; col++)
                this.grid[row].push(null);
        }
    }

    // add a new ship on the grid
    // returns true if ship added, false otherwise (problems with grid/size)
    add_ship(ship, row, col){
        // Verify if ship position available (no ship and inside of grid)
        if (!this.is_free(ship, row, col))
            return false;

        // Add the ship in the grid
        let x_offset = 0, y_offset = 0;
        ship.orientation == "V" ? x_offset = 1 : y_offset = 1;

        for (let tile=0 ; tile<ship.size ; tile++)
            this.grid[row+tile*x_offset][col+tile*y_offset] = ship;

        return true;
    }


    is_free(ship, row, col){
        let x_offset = 0, y_offset = 0;
        ship.orientation == "V" ? x_offset=1 : y_offset=1;

        // Verify if first and last positions of ship are inside the grid
        if (row<0 || row >= this.size || col<0 || col >= this.size)
            return false;

        let last_row = row + x_offset*(ship.size - 1);
        let last_col = col + y_offset*(ship.size - 1);
        if (last_row<0 || last_row >= this.size || last_col<0 
            || last_col>=this.size)
            return false;

        // Add the ship in the grid
        for (let tile=0 ; tile<ship.size ; tile++)
            if (this.grid[row+tile*x_offset][col+tile*y_offset] != null)
                return false;

        return true;
    }

  /* Other player fired on the given tile
   * Returns true if there is a battle on this tile, False otherwise
   */
    check_attack(x, y){
        let f=0;
        return false;
    }
  
    print_grid(){
        for (let row=0 ; row<this.size ; row++){
            let print = " ";
            for (let col=0 ; col<this.size ; col++){
                let tile = this.grid[row][col];
                print += tile == null ? '. ' : tile.name + ' ';
            }
            console.log(print)
        }
    }

}


// Define a ship
class Ship{
    constructor(name, size, orientation='H'){
        this.name = name;
        this.size = size;
        this.orientation = orientation;
        this.states = [];
        for (let i=0 ; i<size ; i++)
            this.states.push(0); 
    }

    rotate(){
        if (this.orientation == 'H')
            this.orientation = "V";
        else
            this.orientation = "H";
    }   
}


var s1 = new Ship("B", 2, "V");
var s2 = new Ship("A", 3, "H");
var b = new Board(4);
// s2.rotate();  
b.add_ship(s1, 0, 0);
b.add_ship(s2, 3, 0)
b.print_grid();
