var array1 = [2, 3, 4, 5, 1, 10, 7, 8, 9, 6];
var array2 = [44, 5, 13, 10, 7, 12, 14, 61];
var segmentArray = [];

var j;
var k = 0;

for (var i = 0; i < array1.length; i++) {
  j = 0;

  while (j < array2.length && array2[j] != array1[i]) {
    j++;
  }

  if (j < array2.length) {
    segmentArray[k++] = array1[i];
  }
}

console.log('The number(s) ' + segmentArray + ' existed in both arrays.');
