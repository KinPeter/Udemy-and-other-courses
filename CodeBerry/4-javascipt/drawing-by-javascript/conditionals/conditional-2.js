var canvas = document.getElementById('myCanvas13');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var y = ch/2;

context.strokeStyle = "red";

for (var i = 0; i <= cw; i+=3) {
  context.beginPath();
  context.moveTo(i, y);
  if (i % 2 == 0) {
    context.lineTo(cw/2, 0);
  }
  else {
    context.lineTo(cw/2, ch);
  }
  context.stroke();
}
