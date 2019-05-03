var canvas = document.getElementById('myCanvas11');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 0;
var y = 0;
var w = cw;
var h = ch;
var hue = 360;
//hsla(360, 50%, 45%, 1)

for (var i = 0; i < 17; i++) {
  context.fillStyle = 'hsla(' + hue + ', 50%, 45%, 1)';
  context.fillRect(x, y, w, h);
  hue -= 360/17;
  x += 10;
  y += 10;
  w -= 20;
  h -= 20;
}
