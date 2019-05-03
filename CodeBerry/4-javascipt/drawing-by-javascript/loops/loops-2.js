var canvas = document.getElementById('myCanvas8');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var size = ch/6.5;
var x = size/2;
var y = size/2 - size;

context.fillStyle = 'rgba(255,165,0,.5)';

for (var i = 0; i <= 5; i++ ) {
  for (var j = 0; j < i; j++) {
    context.fillRect(x, y, size, size);
    x += size + 7;
  }
  x -= j * (size + 7);
  y += size + 7;
}
