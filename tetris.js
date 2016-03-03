TetrisLib.setup();

var Tetris = function(width, height) {
  this.board = new Board(width, height);
  // This example places a L piece in the upper left corner
  this.currentPiece = new Piece(0, 0, Shapes.L);
  this.score = 0;
  this.gameover = false;
};
Tetris.prototype = {
  play: function() {
    TetrisLib.addKeydownListener(this.onKeydown.proxy(this));
    this.updateGame();
  },

  // Updates the game state.
  updateGame: function() {
    // When placing a new piece, check to see if it violates end-game condition
    this.gameover = this.board.placePiece(this.currentPiece);
    TetrisLib.drawBoard(this.board);
    
    // console.log("Current score:", this.score);
    this.board.removePiece(this.currentPiece);

    if (this.gameover) {
      alert('GAME OVER, SCORE = ' + this.score + '\nREFRESH TO RESTART');
    }
  },

  // This example code responds to keyboard input.
  // The argument "key" will be on of "left", "up", "right", "down".
  onKeydown: function(key) {
    // console.log("Key has been pressed: ", key);
    switch (key) {
    case "left":
      // move first
      this.currentPiece.move(-1, 0);
      // check collision violation
      if (this.checkCollision()) {
        // if there is a collision violation, move back, aka, move is not allowed
        this.currentPiece.move(1, 0);
      }
      break;
    case "right":
      this.currentPiece.move(1, 0);
      if (this.checkCollision()) {
        this.currentPiece.move(-1, 0);
      }
      break;
    case "down":
      this.currentPiece.move(0, 1);
      if (this.checkCollision()) {
        this.currentPiece.move(0, -1);
      }
      break;
    case "up":
      // instant down is work in progress and does not work
      this.instantDown();
      break;
    case "CCW":
      this.currentPiece.rotate("left");
      if (this.checkCollision()) {
        this.currentPiece.rotate("right");
      }
      break;
    case "CW":
      this.currentPiece.rotate("right");
      if (this.checkCollision()) {
        this.currentPiece.rotate("left");
      }
      break;
    }
    this.updateGame();
  },

  // Checks to see if the current piece is anchored
  checkAnchor: function() {
    // For every [row,col] of the piece that's 1, check to see if [row+1, col] of board is 1
    // OR, if row is this board's height - 1, aka bottom
    for (var i = this.currentPiece.cells.length - 1; i >= 0; i--) {
      for (var j = 0; j < this.currentPiece.cells[i].length; j++) {
        if (this.currentPiece.cells[i][j] == 1) {
          if ((this.currentPiece.y + i) >= (this.board.height - 1)) {
            return true;
          } else if (this.board.cells[this.currentPiece.y + i + 1][this.currentPiece.x + j] == 1) {
            return true;
          }
        }
      }
    }
    // At the end of the loop, return false, because no piece is anchored
    return false;
  },

  // Generate a random shape
  generateShape: function () {
    var randNum = Math.floor(Math.random() * Object.keys(Shapes).length);
    switch (randNum) {
    case 0:
      this.currentPiece = new Piece(0, 0, Shapes.SQUARE);
      break;
    case 1:
      this.currentPiece = new Piece(0, 0, Shapes.L);
      break;
    case 2:
      this.currentPiece = new Piece(0, 0, Shapes.J);
      break;
    case 3:
      this.currentPiece = new Piece(0, 0, Shapes.LINE);
      break;
    case 4:
      this.currentPiece = new Piece(0, 0, Shapes.S);
      break;
    case 5:
      this.currentPiece = new Piece(0, 0, Shapes.Z);
      break;
    case 6:
      this.currentPiece = new Piece(0, 0, Shapes.T);
      break;
    }
  },

  checkCollision: function () {
    // for all blocks of the shape, check:
      // is it out of bound? 
        // if so, return true
      // does the board contain a one at this location?
        // if so return true
    // after running through everything, return false

    for (var i = 0; i < this.currentPiece.cells.length; i++) {
      for (var j = 0; j < this.currentPiece.cells[i].length; j++) {
        if (this.currentPiece.cells[i][j] == 1) {
          var locX = this.currentPiece.x + j;
          var locY = this.currentPiece.y + i;
          if (locX >= this.board.width || locX < 0 || locY >= this.board.height) {
            return true;
          } else if (this.board.cells[locY][locX] == 1) {
            return true;
          }
        }
      }
    }
    return false;
  },

  instantDown: function () {
    var shortestDistance = [0, 16];
    // For each element of the shape that's 1, check the distance to the bottom, 
    // which could be the edge of the frame, or the closest thing on the board in this column
    for (var i = 0; i < this.currentPiece.cells.length; i++) {
      for (var j = 0; j < this.currentPiece.cells[i].length; j++) {
        if (this.currentPiece.cells[i][j] == 1) {
          var keepGoingDown = true;
          var y = this.currentPiece.y + i;
          while(keepGoingDown) {
            // console.log('Looking down at the board here', y, this.currentPiece.x + j, 'is', this.board.cells[y][this.currentPiece.x + j]);
            // check to see if downard is going out of bound, if it is, store if this distance is shorter than the current shortest
            if (y >= this.board.height) {
              keepGoingDown = false;
              if (shortestDistance[1] > (this.board.height - 1 - this.currentPiece.y - i)) {
                shortestDistance[0] = this.currentPiece.x + j;
                shortestDistance[1] = (this.board.height - 1 - this.currentPiece.y - i);
              }
            // check to see if downard is running into existing stuff, if it is, store if this distance is shorter than the current shortest
            } else if (this.board.cells[y][this.currentPiece.x + j] == 1) {
              keepGoingDown = false;
              if (shortestDistance[1] > (y - 1 - this.currentPiece.y - i)) {
                shortestDistance[0] = this.currentPiece.x + j;
                shortestDistance[1] = y - 1 - this.currentPiece.y - i;
              }
            } else {
              y++;
            }
          }
        }
      }
    }
    this.currentPiece.move(0, shortestDistance[1]);
  }
};

var tetris;
document.getElementById('start').addEventListener('click', function() {
  tetris = new Tetris(10, 15);
  tetris.play();
  var gameInterval = setInterval(function() {
    if (tetris.gameover) {
      return clearInterval(gameInterval);
    } else {
      if (tetris.checkAnchor()) {
        // if so, add it to the board
        tetris.board.placePiece(tetris.currentPiece);
        // also check any lines that can possibly be cleared
        tetris.score += tetris.board.clearLines();
        // also generate a new current piece
        tetris.generateShape();
      }
      tetris.currentPiece.move(0, 1);
      tetris.updateGame();
    }
  }, 600);
});
