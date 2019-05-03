// BLOCKS 

//declaring a block in ES6:
{
    const a = 1;
    let b = 2;
    var c = 3;
}

console.log(c);     //will be fine as var is not block scoped
console.log(a, b);  //will throw error because const and let are only available inside the block


