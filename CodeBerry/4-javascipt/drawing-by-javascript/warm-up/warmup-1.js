var canvas = document.getElementById('myCanvas1');
var context = canvas.getContext('2d');

var cw = canvas.width;
var ch = canvas.height;

var size = [100, 100]

context.fillStyle = 'green';

context.fillRect(cw-(size[0]+10), ch-(size[1]+10), size[0], size[1]);
