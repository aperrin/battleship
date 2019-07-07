// Fonctions to display elements on screen (grid etc.)

/** Create and update a grid (draw lines and ships)
*/
class GridManipulator {
  /*
  Create and format (size) canvas where the grid will be drawn, 
  as well as the corresponding context object.

  @param {div} div - div into which grid must be drawn
  @param {number} lineWidth - width of drawn lines of the grid
  */
	constructor(div, lineWidth=2){
		this.div = div;
		// Create canvas object where all graphical elements will be drawn (container)
		this.canvas = document.createElement("canvas");
		// Insert canvas in given div element
		this.div.appendChild(this.canvas);
		//change canvas dimensions
		this.width = this.div.offsetWidth;
		this.height = this.div.offsetHeight;
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		// Context: object filling the canvas
		this.ctx = this.canvas.getContext("2d");
		this.ctx.canvas.width = this.width;
		this.ctx.canvas.height = this.height;
		this.lineWidth = lineWidth;
    // Tile dimenions
    this.tileWidth = undefined;
    this.tileHeigth = undefined;
    // Coordinates of the tile over which the mouse currently is. Undefined if out of the grid.
    this.mouseCol = undefined; 
    this.mouseRow = undefined;
    // Current state of game
    this.state = undefined;
    // Listenner to log mouse coordinates when mouse moves on grid
    let that = this;
    var divPos = this.div.getBoundingClientRect();
    this.div.onmousemove = (event) => {that.set_position(event, divPos)};
	}

  set_grid_state(state){
    if (state != this.state) {
      this.state = state;
      this.nbRows = state.length;
      this.nbCols = state[0].length;
      this.tileHeigth = Math.floor(this.height / this.nbRows);
      this.tileWidth = Math.floor(this.width / this.nbCols);
      this.draw(state);
      console.log("draw from state");
    }

  }

  /*
  Update current state of the grid (number of lines/columns; ships)

  @param {obj} state - grid state (eval from json formatted state sent by server)
  */
	draw(state){
    // Draw background
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw current highlighted tile in another color
    // fillRect(x_upleft, y_upleft, width, height)
    this.ctx.fillStyle = "white";
    var col_upleft = this.mouseCol * this.tileHeigth;
    var row_upleft = this.mouseRow * this.tileWidth;
    this.ctx.fillRect(col_upleft, row_upleft, this.tileWidth, this.tileHeigth);
    console.log("tile rect: col=" + col_upleft + " row=" + row_upleft);


		// Draw all lines and columns on the grid (here in red): 
		this.ctx.fillStyle = "red";
		for (let line=0;line<=this.nbRows;line++){
			this.ctx.fillRect(0, line * this.tileWidth - this.lineWidth/2, this.width, this.lineWidth);
		}
		for (let col=0;col<=this.nbCols;col++){
			this.ctx.fillRect(col * this.tileHeigth - this.lineWidth/2, 0, this.lineWidth, this.height);
		}
            		
		// Draw ships
		this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font='20px Arial';
		for (let row=0 ; row<this.nbRows ; row++) {
            for (let col=0 ; col<this.nbCols ; col++) {
            	let tile = state[row][col];
            	if (tile != null){
            		this.ctx.fillText(tile.name, col*this.tileHeigth + this.tileHeigth/2, row*this.tileWidth + this.tileWidth/2);
            	}
            }
        }
	}

  /*
  Action when 'onmousemove' is detected:
  Get current position of mouse, convert it to row/col position in the grid, and set those new values (if changed). If they changed, call draw to update the view

  @param {event} event - Event given by javascript when 'onmousemove' is detected. Gives (x,y) position of the mouse on the screen.
  @param {div.getBoundingClientRect()} divPos - Position of div object on the screen.
  */
  set_position(event, divPos){
    // Get X and Y position of mouse relative to the grid
    var myX = event.clientX - divPos.left;
    var myY = event.clientY - divPos.top;
    // console.log("x = " + myX + "; y=" + myY);
    
    // Convert X,Y coordinates to col/row values
    var mouseCol = Math.floor(myX/this.tileWidth);
    var mouseRow = Math.floor(myY/this.tileHeigth); 
    if (mouseCol != this.mouseCol || mouseRow != this.mouseRow) {
      this.mouseCol = mouseCol;
      this.mouseRow = mouseRow;
      this.draw(this.state);
      console.log("Draw from mouse position")
    }
  }
};

var opGrid = document.getElementById("opponentGrid");
opGrid = new GridManipulator(opGrid, 2);

// request the given url (or / if root of our website) -> requires "/getstate" (which is an url containing a function)
// -> function indicating what to do once request is done
$.get("/getstate", function (data) {
	// Convert data (string) to js object
	var state = eval(data);
  opGrid.set_grid_state(state);
	// opGrid.draw(state);
});
