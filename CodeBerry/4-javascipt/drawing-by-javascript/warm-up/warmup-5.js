var canvas = document.getElementById('myCanvas5');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var x = 0;
var y = 0;

context.strokeStyle = 'gray';
context.fillStyle = 'orange';
context.beginPath();
context.moveTo(cw/3, ch/3*2);
context.lineTo(cw/2, ch/3);
context.stroke();

context.lineTo(cw/3*2, ch/3*2);
context.stroke();

context.lineTo(cw/3, ch/3*2);
context.stroke();
context.fill();
