// ARROW FUNCTIONS 2

// Arrow functions do NOT have a 'this' keyword, they share it from the function they are written in

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
box5.clickMe();


// ES5
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
        // Arrow functions do NOT have a 'this' keyword, they share it from the function they are written in
    }
}
box6.clickMe();


//////////////////////////////////////
function Person(name) {
    this.name = name;
}
// ES5
Person.prototype.myFriends5 = function(friends) {
    var array = friends.map(function(elem) {
        return this.name + ' is friends with ' + elem;
    }.bind(this));
    console.log(array);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {
    var array = friends.map(elem => this.name + ' is friends with ' + elem);
    console.log(array);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends6(friends);






