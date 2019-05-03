var canvas = document.getElementById('myCanvas6');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 0;
var y = 0;

context.strokeStyle = 'red';
context.beginPath();
context.moveTo(x, ch/2);
context.lineTo(cw, ch/2);
context.stroke();

context.strokeStyle = 'green';
context.beginPath();
context.moveTo(cw/2, y);
context.lineTo(cw/2, ch);
context.stroke();
