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
		this.lineWidth = lineWidth
	}

  /*
  Update current state of the grid (number of lines/columns; ships)

  @param {obj} state - grid state (eval from json formatted state sent by server)
  */
	update_state(state){
		this.ctx.fillStyle = "red";
		var nbLines = state.length;
		var nbCols = state[0].length;
		var tileHeigth = Math.floor(this.height / nbLines);
		var tileWidth = Math.floor(this.width / nbCols);

		// Draw all lines and columns: 
		for (let line=0;line<=nbLines;line++){
			this.ctx.fillRect(0, line * tileWidth - this.lineWidth/2, this.width, this.lineWidth);
		}
		for (let col=0;col<=nbCols;col++){
			this.ctx.fillRect(col * tileHeigth - this.lineWidth/2, 0, this.lineWidth, this.height);
		}
            		
		// Draw ships
		this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font='20px Arial';
		for (let row=0 ; row<nbLines ; row++) {
            for (let col=0 ; col<nbCols ; col++) {
            	let tile = state[row][col];
            	if (tile != null){
            		this.ctx.fillText(tile.name, col*tileHeigth + tileHeigth/2, row*tileWidth + tileWidth/2);
            	}
            }
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
	opGrid.update_state(state);
});



