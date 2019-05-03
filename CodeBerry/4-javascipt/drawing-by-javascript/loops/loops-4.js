var canvas = document.getElementById('myCanvas10');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 150;
var y = 40;

context.strokeStyle = 'gray';

for (var i = 0; i < 30; i++) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x+50, y+100);
  context.lineTo(x-50, y+100);
  context.lineTo(x, y);
  context.stroke();
  x += 5;
  y += 5;
}
