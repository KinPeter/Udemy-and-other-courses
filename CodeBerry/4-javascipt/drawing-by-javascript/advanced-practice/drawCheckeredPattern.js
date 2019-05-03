var canvas = document.getElementById('myCanvas19');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

function drawCheckeredPattern(row, col){
  var x = 0;
  var y = 0;

  for (var i = 0; i < row; i++ ) {
    for (var j = 0; j < col; j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          context.fillStyle = 'black';
        }
        else {
          context.fillStyle = 'white';
        }
      }
      else {
        if (j % 2 == 0) {
          context.fillStyle = 'white';
        }
        else {
          context.fillStyle = 'black';
        }
      }
      context.fillRect(x, y, cw/col, ch/row);
      x += cw/col;
    }
    x -= j * (cw/col);
    y += ch/row;
  }
}

drawCheckeredPattern(8,8)