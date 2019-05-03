var array = [1, 3, 5, 7, 8, 12, 43];

var target = 8;

var i = 0;

while (i < array.length && array[i] != target) {
  i++;
}

if (i < array.length) {
  console.log('The number ' + target + ' is found in the array!');
}
else {
  console.log('Target NOT found.');
}
