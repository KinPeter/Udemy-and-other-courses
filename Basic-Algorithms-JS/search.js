var array = [1, 3, 5, 7, 8, 12, 43];

var target = 5;

var i = 0;

while (i < array.length && array[i] != target) {
  i++;
}

if (i < array.length) {
  console.log('The number ' + target + ' is the ' + (i+1) + '. element of the array.');
}
else {
  console.log('Target not found.');
}
