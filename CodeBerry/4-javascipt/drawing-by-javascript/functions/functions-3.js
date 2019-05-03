var canvas = document.getElementById('myCanvas17');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //300

function lineToCenter(x, y, color) {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(cw/2, ch/2);
  context.stroke();
}

var color = 'DARKTURQUOISE';

for (var i = 0; i < 100; i++) {
  var randomx = Math.floor((Math.random() * cw) + 1);
  var randomy = Math.floor((Math.random() * ch) + 1);
  lineToCenter(randomx, randomy, color);
}
