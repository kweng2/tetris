// The board is represented as an array or arrays of cells. Each cell can be 0 meaning empty, or 1 meaning it
// is filled.
var Board = function(width, height) {
  this.width = width;
  this.height = height;

  // Create the board, initializing all cells on the board to empty.
  this.cells = [];
  for (var y = 0; y < this.height; y++) {
    this.cells[y] = [];
    for (var x = 0; x < this.width; x++)
      this.cells[y][x] = 0;
  }
};
Board.prototype = {
  // Add a piece to the board
  placePiece: function(piece) {
    var row, cell;
    for (var j = 0; j < piece.cells.length; j++) {
      row = piece.cells[j];
      for (var k = 0; k < row.length; k++) {
        cell = row[k];
        if (cell == 1) {
          // game end check, to see if there is a collision when a new piece is added to the board
          if (this.cells[piece.y + j][piece.x + k] == 1) {
            return true;
          } else {
            this.cells[piece.y + j][piece.x + k] = 1;
          }
        }
      }
    }
    // if line 26 did not run, returns false, game can continue
    return false;
  },

  // Removes a piece from the board
  removePiece: function(piece) {
    var row, cell;
    for (var j = 0; j < piece.cells.length; j++) {
      row = piece.cells[j];
      for (var k = 0; k < row.length; k++) {
        cell = row[k];
        if (cell == 1) {
          this.cells[piece.y + j][piece.x + k] = 0;
        }
      }
    }
  },

  // Returns true if the piece would collide with the sides of the board or an existing piece. Returns false
  // if the piece is currently in a valid location.
  collisionTest: function(piece) {
    // TODO
  },

  // Removes filled rows from the board. Returns the number of lines cleared.
  clearLines: function() {
    // Detect how many and which lines need to be removed
    var lines = [];

    for (var i = 0; i < this.height; i++) {
      var isFull = true;
      for (var j = 0; j < this.width; j++) {
        isFull = isFull && this.cells[i][j] == 1;
      }
      if (isFull) {
        lines.push(i);
      }
    }
    // Actually remove those lines by shifting everything above them down
    for (var i = 0; i < lines.length; i++) {
      // Shift every line above this line downward
      for (var j = lines[i]; j > 0; j--) {
        this.cells[j] = this.cells[j-1].slice();
      }
      this.cells[0] = [];
      for (var k = 0; k < this.width; k++) {
        this.cells[0][k] = 0;
      }
    }

    return lines.length;
  }
};
