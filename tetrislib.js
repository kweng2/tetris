TetrisLib = {
  setup: function() {
    document.addEventListener("keydown", this.onKeydown.proxy(this), false);
  },

  // drawBoard: function(board) { this.drawBoardUsingConsole(board); },
  drawBoard: function(board) { this.drawBoardUsingCanvas(board); },

  drawBoardUsingCanvas: function(board) {
    var canvas = document.getElementById('board');
    var canvasCtx = canvas.getContext('2d');

    canvasCtx.fillStyle = 'black';

    canvasCtx.clearRect(0,0,400,600);
    var w = 40;
    var h = 40;
    for (var i = 0; i < board.cells.length; i++) {
      for (var j = 0; j < board.cells[i].length; j++) {
        if (board.cells[i][j] == 1) {
          canvasCtx.fillRect(j*40, i*40, w, h);
        }
      }
    }

  },

  drawBoardUsingConsole: function(board) {
    var output = "", x, y;
    for (x = 0; x < board.width + 2; x++)
      output += "-";
    output += "\n";

    for (y = 0; y < board.height; y++) {
      output += "|";
      for (x = 0; x < board.width; x++)
        output += (board.cells[y][x] == 0 ? " " : "#");
      output += "|\n";
    }

    for (x = 0; x < board.width + 2; x++)
      output += "-";

    console.log(output);
  },

  /*
   * Adds a listener for keydown events for the 4 arrow keys.
   * - listener: a function which gets called with the key that was pressed. The key will be one of
   *   "left", "up", "down", "right".
   */
  addKeydownListener: function(listener) { this.onKeydownListener = listener; },

  onKeydown: function(event) {
    var keycodeToKey = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      90: "CCW",
      88: "CW"
    };
    var key = keycodeToKey[event.which];
    if (key && this.onKeydownListener)
      this.onKeydownListener(key);
  }
};

// You can use these to define some shapes, or feel free to use your own shape data model.
Shapes = {
  SQUARE:
    [[0, 0, 0, 0],
     [0, 1, 1, 0],
     [0, 1, 1, 0],
     [0, 0, 0, 0]],

  L:
    [[0, 0, 0, 0],
     [1, 1, 1, 0],
     [0, 0, 1, 0],
     [0, 0, 0, 0]],

  J:
    [[0, 0, 0, 0],
     [0, 1, 1, 1],
     [0, 1, 0, 0],
     [0, 0, 0, 0]],

  LINE:
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],

  S:
    [[0, 0, 0, 0],
     [0, 1, 1, 0],
     [1, 1, 0, 0],
     [0, 0, 0, 0]],

  Z:
    [[0, 0, 0, 0],
     [1, 1, 0 ,0],
     [0, 1, 1, 0],
     [0, 0, 0, 0]],

  T:
    [[0, 0, 0, 0],
     [0, 1, 0, 0],
     [1, 1, 1, 0],
     [0, 0, 0, 0]]
};

/* Equivalent to jQuery's proxy and Prototype's bind(). */
Function.prototype.proxy = function(thisValue) {
  var self = this;
  return function() { self.apply(thisValue, arguments); };
};
