//a 'canvas' változó a html 'myCanvas' eleme lesz
var canvas = document.getElementById('myCanvas');

//a 'context' változó a canvas tartalma 2D-ben
var context = canvas.getContext('2d');

//csinálunk 2 változót a canvas mindenkori méreteivel
var cw = canvas.width;
var ch = canvas.height;

//.fillStyle = 'szín vagy színkód' kitöltőszín
context.fillStyle = 'orange';

//.fillRect(x, y, width, height)
context.fillRect(cw/2-50, ch/2-50, 100, 100);

context.beginPath();             //indít egy új vonalat
context.moveTo(140,10);          //mozgás felemelt tollal
context.lineTo(240,110);         //mozgás letett tollal (vonalat húz)
context.strokeStyle = 'orange';  //vonal színe
context.stroke();                //"húzz vonalat"
