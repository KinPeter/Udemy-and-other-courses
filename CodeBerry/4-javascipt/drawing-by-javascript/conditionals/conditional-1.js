var canvas = document.getElementById('myCanvas12');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 30;
var a = cw/10;

for (var i = 1; i <= 15; i++) {
  context.fillStyle = 'rgba(0, 0, 0, .5)';
  if ((i % 3 == 0) && (i % 5 == 0)) {
    context.fillStyle = 'rgba(0, 128, 0, .5)';
  }
  else if (i % 5 == 0) {
    context.fillStyle = 'rgba(255, 255, 0, .5)';
  }
  else if (i % 3 == 0) {
    context.fillStyle = 'rgba(0, 0, 255, .5)';
  }
  context.fillRect(x, x, a, a);
  x += a/3;
}
