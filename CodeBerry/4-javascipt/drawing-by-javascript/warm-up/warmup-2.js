var canvas = document.getElementById('myCanvas2');
var context = canvas.getContext('2d');

var cw = canvas.width;
var ch = canvas.height;

var size = 100;
var pos = 100;

context.fillStyle = 'rgba(255, 0, 0, .5)';
context.fillRect(pos, pos, size, size);

context.fillStyle = 'rgba(0, 0, 255, .5)';
context.fillRect(pos+size/2, pos+size/2, size, size);
