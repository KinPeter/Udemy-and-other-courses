var array = [1, 3, 5, 7, 8, 12, 43];

var target = 8;

var i = 0;

while (i < array.length && array[i] != target) {
  i++;
}

var result = i + 1;
console.log('The number ' + target + ' is the ' + result + '. element of the array.');
