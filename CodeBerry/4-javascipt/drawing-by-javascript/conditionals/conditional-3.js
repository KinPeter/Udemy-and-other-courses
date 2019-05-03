var canvas = document.getElementById('myCanvas14');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var y = ch/2;

context.strokeStyle = "blue";

for (var i = 0; i <= cw; i++) {
  context.beginPath();
  context.moveTo(i, y);
  if (i % 4 == 0) {
    context.lineTo(0, 0);
  }
  else if (i % 4 == 1) {
    context.lineTo(cw, 0);
  }
  else if (i % 4 == 2) {
    context.lineTo(0, ch);
  }
  else if (i % 4 == 3) {
    context.lineTo(cw, ch);
  }
  context.stroke();
}
