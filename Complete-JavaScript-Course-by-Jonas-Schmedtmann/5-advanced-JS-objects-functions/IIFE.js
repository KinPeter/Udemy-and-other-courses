// Immediately Invoked Function Expressions (IIFE)

/* non-IIFE way: */
function game(){
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();

// IIFE way:
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);    
})();

// with argument:
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);    
})(5);