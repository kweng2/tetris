// Encapsulation of a tetris piece.
//  x - x origin
//  y - y origin
//  cells - multi-dimensional array of 1's and 0's describing the piece's shape
var Piece = function(x, y, cells) {
  this.x = x;
  this.y = y;
  this.cells = cells;
};
Piece.prototype = {
  // Rotate this piece
  rotate: function(direction) {
    // TODO
    switch (direction) {
    // Counter-clock-wise rotation
    case "left":
      rotateMatrix(this.cells, "CCW");
      break;
    // Clock-wise rotation
    case "right":
    rotateMatrix(this.cells, "CW");
      break;
    }
  },

  // Move this piece by x and y
  move: function(x, y) {
    this.x += x;
    this.y += y;
  }
};

var rotateMatrix = function(matrix, direction) {

  // make a deep copy of the input matrix
  var deepCopy = function (matrix) {
    var copyMatrix = [];
    for (var i=0; i<matrix.length; i++) {
      var copyRow = [];
      for (var j=0; j<matrix[i].length; j++) {
        copyRow.push(matrix[i][j]);
      }
      copyMatrix.push(copyRow);
    }
    return copyMatrix;
  };

  var copyMatrix = deepCopy(matrix);

  // place into matrix is a function that mutates the input matrix by
  // changing the kth column and lth row element of the matrix to an input value
  var changeVal = function (l, k, val) {
    matrix[l][k] = val;
  };

  // get the correct kth column, and lth row given the ith row and jth column of the copy matrix
  // also given the row length and column length of copy matrix
  // this function return a tuple of form [l, k]
  var getLK = function (i, j, rL, cL, direction) {
    if (direction == "CW") {
      var k = rL - 1 - i;
      var l = j;
      return [l, k];
    } else if (direction == "CCW") {
      var k = i;
      var l = cL - 1 - j;
      return [l, k];
    }
  };

  var rL = copyMatrix.length;
  var cL = copyMatrix[0].length;
  // Iterate over every row of the copy, starting from the bottom row first
  for (var i = rL-1; i >= 0; i--) {
    // iterate over each col of that row
    for (var j = 0; j < cL; j++) {
      // Place this element into the lth row and kth column of the input matrix
      var newLoc = getLK(i, j, rL, cL, direction);
      var newVal = copyMatrix[i][j];
      changeVal(newLoc[0], newLoc[1], newVal);
    }
  }

  return matrix;
};