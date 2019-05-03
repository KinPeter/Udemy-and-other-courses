var canvas = document.getElementById('myCanvas20');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var a = cw/4.5;
var h = Math.sqrt(3) / 2 * a; //egyenlő oldalú háromszög magassága

var posx = cw/2;
var posy = ch/10;

var color = '#D7565F';

function drawTriangle(x, y, color) {
  context.strokeStyle = color;
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + a/2, y + h);
  context.lineTo(x - a/2, y + h);
  context.lineTo(x, y);
  context.stroke();
  context.fill();
}

for (var i = 1; i < 4; i++ ) {
  for (var j = 0; j < i; j++) {
    if (i == 2) {
      color = '#36A843';
    }
    else if (i == 3) {
      color = '#2F7876';
    }
    drawTriangle(posx, posy, color);
    posx += a;
  }
  posx -= j * a + a/2;
  posy += h + 4;
}
