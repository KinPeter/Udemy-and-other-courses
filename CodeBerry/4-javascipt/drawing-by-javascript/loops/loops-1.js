var canvas = document.getElementById('myCanvas7');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var size = ch/6.5;
var pos = size/2;

context.fillStyle = 'RGBa(255, 165, 0, .5)';

for (var i = 0; i < 10; i++) {
  context.fillRect(pos, pos, size, size);
  pos += size/2;
}
