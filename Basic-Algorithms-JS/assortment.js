var array = [1, 3, 5, 7, 8, 12, 43];

var newArray = [];

var j = 0;

for (var i = 0; i < array.length; i++) {
  if (array[i] > 6) {
    newArray[j++] = array[i];
  }
}

console.log('There are ' + j + ' elements in the array, which are higher than 6.' );
console.log('These are: ' + newArray);
