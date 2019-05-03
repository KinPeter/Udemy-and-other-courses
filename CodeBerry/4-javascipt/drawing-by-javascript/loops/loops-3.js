var canvas = document.getElementById('myCanvas9');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var size = ch/7.8;
var x = size/2;
var y = size/2;

//rgb(199,79,120)
var red = 199;
var green = 79;
var blue = 120;

for (var i = 0; i < 6; i++ ) {
  for (var j = 0; j < 6; j++) {
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    context.fillRect(x, y, size, size);
    x += size + 7;
    red -= 7;
  }
  x -= j * (size + 7);
  y += size + 7;
  blue += 15;
}
