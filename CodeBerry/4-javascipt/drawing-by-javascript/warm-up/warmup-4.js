var canvas = document.getElementById('myCanvas4');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 0;
var y = 0;

context.strokeStyle = 'red';
context.beginPath();
context.moveTo(x,y);
context.lineTo(cw,ch);
context.stroke();

context.beginPath();
context.moveTo(x,ch);
context.lineTo(cw,y);
context.stroke();
