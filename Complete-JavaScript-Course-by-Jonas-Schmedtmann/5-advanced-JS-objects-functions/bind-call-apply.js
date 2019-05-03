// Bind, Call, Apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, time) {
        if (style === 'formal') {
            console.log('Good ' + time + ' Ladies and Gentlemen. I\'m ' + this.name + '. I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! Whattsup? I\'m ' + this.name + '. I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + time + '!');
        }
    }
};

var emily = {
    name: 'Emily',
    job: 'designer',
    age: 35
};

john.presentation('formal', 'morning');

//call method -- method borrowing (presentation method to Emily object)
john.presentation.call(emily, 'friendly', 'afternoon');


//john.presentation.apply(emily, ['formal', 'evening']);

//bind method -- to pre-set the first argument
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('evening');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


var years = [1990, 1965, 1937, 2005, 1998];
// Generic main function to loop through arrays -- 'fn' argument is the callback function
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

// Callback functions that we can pass to the main function
function calculateAge(elem) {
    return 2019 - elem;
}

function isFullAge(limit, elem) {
    return elem >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullAgeJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullAgeJapan);


























