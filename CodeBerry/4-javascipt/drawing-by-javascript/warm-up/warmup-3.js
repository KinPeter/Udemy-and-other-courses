var canvas = document.getElementById('myCanvas3');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var a = 250;
var b = 50;
var x = cw/2 - a/2;
var y = ch/2 - 1.5*b;

context.fillStyle = 'red';
context.fillRect(x, y, a, b);

context.fillStyle = 'white';
context.fillRect(x, y+b, a, b);

context.fillStyle = 'green';
context.fillRect(x, y+2*b, a, b);
