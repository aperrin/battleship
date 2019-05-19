// Fonctions to display elements on screen (grid etc.)

// console.log("toto");

class GridManipulator {
	constructor(div){
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
	}

	update_state(state){
		this.ctx.fillStyle = "red";
		var lineDepth = "5px";
		var nbLines = state.length;
		var nbCols = state[0].length;
		var tileHeigth = Math.floor(this.height / nbLines);
		var tileWidth = Math.floor(this.width / nbCols);

		// Draw all lines and columns: 
		// for each row, col draw vertical (down) and horizontal (right) *
		// line from these coordinates
		for (let row=0 ; row<nbLines ; row++) {
            for (let col=0 ; col<nbCols ; col++) {
				this.ctx.fillRect(row*tileWidth, col*tileWidth, tileWidth, 2);
				this.ctx.fillRect(row*tileHeigth, col*tileHeigth, 2, tileHeigth);
            }
        }

        // 2 lines are missing, as we draw vertical down and horizontal right for each row, 
        // line: down line and right line
		this.ctx.fillRect(0, this.height-2, this.width ,2)
		this.ctx.fillRect(this.width-2, 0, 2 ,this.height)
	}


};

var opGrid = document.getElementById("opponentGrid");
opGrid = new GridManipulator(opGrid);

// request the given url (or / if root of our website) -> requires "/getstate" (which is an url containing a function)
// -> function indicating what to do once request is done
$.get("/getstate", function (data) {
	// Convert data (string) to js object
	var state = eval(data);
	opGrid.update_state(state);
});



